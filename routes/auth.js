const express = require('express');
const { check, body } = require("express-validator/check");

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',
    [
        check("email")
            .isEmail()
            .withMessage("Please enter a valid email.")
            .normalizeEmail(),
        body("password", "Please enter valid password")
            .isLength({ min: 5 })
            .trim(),
    ],
    authController.postLogin
);

router.post('/signup',
    [
        check("email")
            .isEmail()
            .withMessage("Please enter a valid email.")
            .custom((value, { req }) => {
                // if(value===""){

                // }
                return User.findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject("Email already exists! Pick a different email.");
                        }
                    })
            })
            .normalizeEmail()
        ,
        body("password", "Please enter a password of at least 5 characters and with only numbers and text")
            .trim()
            .isLength({ min: 5 })
        // .isAlphanumeric()
        ,
        body("confirmPassword")
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords in both the fields must match.");
                }
                return true;
            })

    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getnewPassword);

router.post("/new-password", authController.postNewPassword);


module.exports = router;