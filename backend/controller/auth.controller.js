const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signin = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            try {
                let user = User.create({
                    email: req.body.email,
                    password: hash
                }, req.body.password)
                res.status(201).json({ message: "Utilisateur créé" });

            } catch (error) {
                res.status(500).json({ message: error.message });
            }

        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });

}

exports.login = async(req, res, next) => {
    try {
        let user = User.getByEmail(req.body.email);
        bcrypt.compare(req.body.password, user.password)
            .then(success => {
                if (success) {
                    res.status(200).json({
                        id: user.id,
                        email: user.email,
                        jwt: jwt.sign({
                            id: user.id
                        }, process.env.JWT_TOKEN)
                    });
                } else {
                    res.status(401).json({ message: "Mot de passe incorrect" });
                }
            })
            .catch(error => {
                res.status(500).json(error);
            })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}