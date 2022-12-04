const express = require('express');
const router = express.Router();
const {User, Post, Comment} = require('../../models');

// Create a user
router.post('/', async (req,res) => {
    try {
        const userData = await User.create(req.body);
        console.log(userData);
        req.session.save(() => {
            req.session.user_id = userData.username;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req,res) => {
    try {
        const userData = await User.findOne({ where: {email: req.body.email }});

        if (!userData) {
            res.status(400).json({ message: "Incorrect email or password, please try again"});
            return;
        };
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: "Invalid email or password, please try again"});
        };
        req.session.save(() => {
            req.session.user_id = userData.username;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req,res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;

