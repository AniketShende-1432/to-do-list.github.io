const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        // Check if a user with the given email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            // If user already exists, return an error response
            return res.status(400).json({ message: "User Already Exists" });
        }
        const hpassword = bcrypt.hashSync(password);
        // If user doesn't exist, create a new user
        const user = new User({ email, username, password:hpassword });
        await user.save();
        // Send success response
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "Please sign up first" });
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // If sign-in is successful, return user data (excluding password)
        const { password, ...userData } = user._doc;
        return res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
