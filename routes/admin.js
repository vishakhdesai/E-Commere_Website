const path = require('path');

const express = require('express');

const { body } = require("express-validator/check");

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product',
    [
        body("title", "Tite should be atleast 3 characters long!")
            .isString()
            .trim()
            .isLength({ min: 3 })
        ,
        body("price")
            .isFloat()
        ,
        body("description", "Description length should be between 5-300 characters")
            .isLength({ min: 5, max: 2000 })
            .trim()
        ,
    ],
    isAuth,
    adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post("/edit-product",
    [
        body("title")
            .isString()
            .isLength({ min: 3 })
            .trim()
        ,
        body("imageUrl")
            .trim()
        ,
        body("price")
            .isFloat()
        ,
        body("description")
            .isLength({ min: 5, max: 2000 })
            .trim()
        ,
    ],
    isAuth,
    adminController.postEditProducts
);

// router.post("/delete-product", isAuth, adminController.postDeleteProduct);
router.delete("/product/:productId", isAuth, adminController.deleteProduct);


module.exports = router;
