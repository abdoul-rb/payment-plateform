const { body, validationResult } = require('express-validator');
const User = require("../models/sequelize/User");
const { Router } = require("express");
const app = Router();
const bcrypt = require("bcryptjs");
const jwt = require("../lib/jwt");

const passwordMinLength = 8;

app.post("/register/supplier",
    body('email')
        .notEmpty().withMessage("Votre email ne peut pas être vide")
        .normalizeEmail().isEmail().withMessage(`Votre email doit avoir le bon format`),
    body('password')
        .notEmpty().withMessage("Votre mot de passe ne peut pas être vide")
        .isString().withMessage(`Le mot de passe doit être du texte`)
        .isLength({ min: passwordMinLength }).withMessage(`La taille du mot de passe doit être minimum ${passwordMinLength} caractères`),
    body('currency')
        .notEmpty().withMessage("La devise ne peut pas être vide")
        .isString().withMessage(`La devise doit être du texte`)
        .matches(/^[$€]{1}$/).withMessage(`Vous devez saisir une devise valide ($, €)`)
        .trim(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, company, phone_number, email, password, currency } = req.body;

        User.create({ 
            name: name.trim(), 
            company: company.trim(),
            phone_number: phone_number.trim(),
            email: email,
            password: password,
            currency: currency,
            roles: 'SUPPLIER' 
        })
        .then((data) => res.status(201).json(data))
        .catch((e) => {
            const errors = {};
            e.errors.map( err => {
                errors[err.path] = err.message;
            })
            return res.status(400).json({ 'errors': errors })
        });

        /* 
        const bodyData = req.body;

        if (body('phone_number').exists()) {
            // Les informations de contact sont bien présent
        } else {
            // Les informations de contact sont vide
        }

        // Enregistrement du kbis en local
        let kbis;
        let uploadPath;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({message: "Aucun fichier n'a été uploadé. Le KBIS est manquant"});
        }
        if (!req.files.hasOwnProperty("KBIS")) {
            return res.status(400).json({message: "Le fichier KBIS est manquant"});
        }

        // On est assuré qu'il y a un fichier KBIS
        kbis = req.files.KBIS;
        uploadPath = __dirname + '/' + kbis.name;

        // La méthode mv permet de déplacer le fichier temporairement enregistré sur la machine
        kbis.mv(uploadPath, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            // Fichier uploadé sur la machine !
        });

        // Renvoyer un message de succès

        res.status(200).json({
            "Message": "Inscription traitée"
        });
        */
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
                            'user': user,
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