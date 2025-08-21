
let express = require('express');

const { userSignup, userLogin } = require('../../controllers/loginController');
let enquiryRoutes = express.Router();


enquiryRoutes.post('/signup',userSignup)
enquiryRoutes.post('/login',userLogin)



module.exports = enquiryRoutes;