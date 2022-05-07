const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'abcdefg';

const fetchuser = require('../middleware/fetchuser');







//==========================================================================================================================================

// ( Create Route ) creating a user using POST request ( /api/auth/signup )
router.post('/signup', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 1 }),
    body('password', 'Password must be of atleast 6 length').isLength({ min: 6 }),
], async (req, res) => {

    //if there is error then return bad request and error

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    //if some error occur in db
    try {

        let user = await User.findOne({ email: req.body.email });

        //If not unique return error
        if (user) {
            return res.status(404).json({ error: "User with this email already exist" });
        }

        //making hash of password
        const salt = await bcrypt.genSalt(10);
        const securedPass = await bcrypt.hash(req.body.password, salt);


        // create New user 
        user = await User.create({
            name: req.body.name,
            password: securedPass,
            email: req.body.email,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        //creating token for user
        const authTocken = jwt.sign(data, JWT_SECRET);

        // returning tocken
        res.json({ authTocken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

})






//==========================================================================================================================================

// ( Login Route ) user by authenticating using Post ( /api/auth/login )
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be of atleast 6 length').exists(),
], async (req, res) => {

    //if there is error then return bad request and error

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Wrong credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ error: "Wrong credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        //creating token for user
        const authTocken = jwt.sign(data, JWT_SECRET);

        // returning tocken
        res.json({ authTocken });

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Server Error");

    }



})





//==========================================================================================================================================

// ROUTE (Getting user data) ( "/api/auth/getuser" )

router.post('/getuser',fetchuser , async (req, res) => {

    try {

        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Server Error");

    }
})



module.exports = router;