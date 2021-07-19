const express = require('express');
let app = express.Router();
const { body, validationResult } = require('express-validator');
const passwordMinLenght = 8;

app.post("/register",
    body('email')
        .notEmpty().withMessage("Votre email ne peut pas être vide")
        .normalizeEmail().isEmail().withMessage(`Votre email doit avoir le bon format`),
    body('name')
        .notEmpty().withMessage("Votre nom ne peut pas être vide")
        .isString().withMessage(`Votre nom doit être du texte`)
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage("Votre mot de passe ne peut pas être vide")
        .isString().withMessage(`Le mot de passe doit être du texte`)
        .isLength({ min: passwordMinLenght }).withMessage(`La taille du mot de passe doit être minimum ${passwordMinLenght} caractères`),
    body('company')
        .notEmpty().withMessage("Votre nom de société ne peut pas être vide")
        .isString().withMessage(`Le nom de votre société doit être du texte`)
        .not().isEmpty().withMessage(`Le nom de votre société ne peut être vide`)
        .trim(),
    body('contactData')
        .optional()
        .isString().withMessage("Les informations de contact doivent être du texte")
        .trim(),
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

        // Enregistrer l'utilisateur en base de données
        const bodyData = req.body;

        if (body('contactData').exists()) {
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

        // Générer le token de connexion

        // Enregistrer le token en session

        // Renvoyer un message de succès

        res.status(200).json({
            "Message": "Inscription traitée"
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Tester que l'utilisateur existe
        const bodyData = req.body;

        // Générer le token de connexion

        // Enregistrer le token en session

        // Renvoyer un message de succès

        res.json({
            "Message": "yes"
        });
    });

module.exports = app;