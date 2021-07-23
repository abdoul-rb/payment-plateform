const { body, validationResult } = require('express-validator');
const User = require("../models/sequelize/User");
const { Router } = require("express");
const app = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const passwordMinLenght = 8;

app.post("/register/supplier",
    body('company')
        .notEmpty().withMessage("Votre nom de société ne peut pas être vide")
        .isString().withMessage(`Le nom de votre société doit être du texte`)
        .not().isEmpty().withMessage(`Le nom de votre société ne peut être vide`)
        .trim(),
    body('phone_number')
        .optional()
        .isString().withMessage("Les informations de contact doivent être du texte")
        .trim(),
    body('email')
        .notEmpty().withMessage("Votre email ne peut pas être vide")
        .normalizeEmail().isEmail().withMessage(`Votre email doit avoir le bon format`),
    body('password')
        .notEmpty().withMessage("Votre mot de passe ne peut pas être vide")
        .isString().withMessage(`Le mot de passe doit être du texte`)
        .isLength({ min: passwordMinLenght }).withMessage(`La taille du mot de passe doit être minimum ${passwordMinLenght} caractères`),
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

        User.create({ name, company, phone_number, email, password, currency, roles: 'SUPPLIER' })
            .then((data) => res.status(201).json(data))
            .catch((e) => {
                const errObj = {};
                e.errors.map( er => {
                    errObj[er.path] = er.message;
                })
                return res.status(400).json({ 'errors': errObj })
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

        // Tester que l'utilisateur existe
        const { email, password } = req.body;

        User.findOne({
            where: { email: email }
        })
        .then((user) => {
            if(user) {
                bcrypt.compare(password, user.password, function(errBcrypt, resBcrypt) {
                    if(resBcrypt) {
                        return res.status(200).json({
                            'userId': '',
                            'token': 'Token'
                        });
                    } else {
                        return res.status(403).json({ 'error': 'Mot de passe incorrect' })
                    }
                })
            }
        })

        const emailExist = User.findOne({ email: email });
        if (!emailExist) throw 'L\'adresse email entrée n\'existe pas.'

        // Générer le token de connexion

        // Enregistrer le token en session

        // Renvoyer un message de succès

        res.json({
            "Message": "yes"
        });
    });

module.exports = app;