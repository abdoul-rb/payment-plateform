const { body, validationResult } = require('express-validator');
const User = require("../models/sequelize/User");
const fileUpload = require('express-fileupload');
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("../lib/jwt");
const app = Router();

app.post("/register/supplier", (req, res) => {
    const { name, company, phone_number, email, password, currency } = req.body;

    console.log('### ', req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({message: "Aucun fichier n'a été uploadé. Le KBIS est manquant"});
    }
    if (!req.files.hasOwnProperty("kbis")) {
        return res.status(400).json({message: "Le fichier KBIS est manquant"});
    }

    console.log('REQ', req);

    if(req.files) {
        var file = req.files.kbis;
        var path = __dirname + '/../files/kbis/' + file.name;

        file.mv(path, (e) => {
            console.log('error in mv', e);
        });
    }

    User.create({ 
        name: name, 
        company: company,
        phone_number: phone_number,
        email: email,
        password: password,
        kbis: path,
        currency: currency,
        roles: 'SUPPLIER'
    })
    .then((data) => res.status(201).json(data))
    .catch((e) => {
        const errors = {};
        console.log('### E ', e)
        e.errors.map((err) => { errors[err.path] = err.message; })
        return res.status(400).json({ 'errors': errors })
    });
});

app.post("/login",
    body('email')
        .notEmpty().withMessage("Votre email ne peut pas être vide")
        .isEmail().withMessage(`Votre email doit avoir le bon format`)
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage("Votre mot de passe ne peut pas être vide")
        .isString().withMessage(`Le mot de passe doit être du texte`),
    (req, res) => {
        console.log(req)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        User.findOne({
            where: { email: email }
        })
        .then((user) => {
            if(user) {
                bcrypt.compare(password, user.password, function(errBcrypt, resBcrypt) {
                    if(resBcrypt) {
                        return res.status(200).json({
                            'userId': user.id,
                            'token': jwt.generatedUserToken(user)
                            // Enregistrer le token en session
                        });
                    } else {
                        return res.status(403).json({ 'error': 'Mot de passe incorrect' });
                    }
                })
            } else {
                return res.status(404).json({ 'error': 'Aucun utilisateur avec cette adresse email' });
            }
        })
        .catch((e) => {
            return res.status(500).json({ 'error': 'Impossible de vérifier l\'utilisateur' })
        });
    });

module.exports = app;