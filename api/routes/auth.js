const { body, validationResult } = require('express-validator');
const User = require("../models/sequelize/User");
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("../lib/jwt");
const app = Router();
const path = require('path')


// Permet de récupérer des données de formulaire transmis via l'entếte multipart/form-data

const multer = require('multer');

// Fonction permettant de parser correctement le nom des fichiers uplodés

const filename_parser = (body,file) => (body.name+path.extname(file.originalname)).replace(/\s+/g,'_')

/**
 * Utilisation de multer en tant que middleware
 * => avant d'invoquer la fonction de la route, les données de la requête sont d'abord récupérées
 */  
app.post("/register/supplier", multer({ 
    storage: multer.diskStorage({
        destination: (req,file,cb) => { cb(null,__dirname+'/../files/kbis/') }, // Les fichiers seront transportés dans le dossier ../files/kbis
        filename: (req,file,cb) => { cb(null,filename_parser(req.body,file)) } // On transforme le nom du fichier en un autre nom (choix arbitraire)
    })
}).single('kbis') 
/** On indique via ce middleware que cette route doit accepter qu'un seul fichier
 *  Ce fichier doit être transporté via le paramètre "kbis" fourni dans la requête
 */, (req, res) => {
    console.log(filename_parser(req.body,req.file))
    const { name, company, phone_number, email, password, currency } = req.body;

    if(!req.file) 
        return res.status(400).json({message: "Aucun fichier n'a été uploadé. Le KBIS est manquant"});
    
    User.create({ 
        name: name, 
        company: company,
        phone_number: phone_number,
        email: email,
        password: password,
        kbis: __dirname+'/../files/kbis/'+filename_parser(req.body,req.file),
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