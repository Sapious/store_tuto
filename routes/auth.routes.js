const router = require("express").Router();
const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(422).json("Email already exist");
		}
	} catch (err) {
		return res.status(500).json(err);
	}
	try {
		const salt = await bcrypt.genSalt(16);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();
		return res.status(201).json(savedUser);
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(401).json("Wrong Email/Password");
		}
		const isPasswordValid = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isPasswordValid) {
			return res.status(401).json("Wrong Email/Password");
		}

		const token = jwt.sign(
			{ _id: user._id, email: user.email },
			process.env.TOKEN_KEY,
			{
				expiresIn: "2 days",
			}
		);

		return res.status(200).json({ user: user, token: token });
	} catch (err) {
		return res.status(500).json(err);
	}
});
module.exports = router;
