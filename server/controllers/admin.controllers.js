const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.models");
module.exports.login = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            return res.status(401).json("wrong email or password ");
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json("wrong password or email");
        }

        const token = jwt.sign(
            {
                _id: admin._id,
                email: admin.email,
                isAdmin: admin.isAdmin,
            },
            process.env.TOKEN_KEY,
            { expiresIn: "3 days" },
        );

        return res.status(200).json({ admin: admin, token: token });
    } catch (err) {
        return res.status(500).json(err);
    }
};
module.exports.addAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            return res.status(422).json("Email already exist");
        }
    } catch (err) {
        return res.status(500).json(err);
    }

    try {
        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newAdmin = new Admin({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });

        const savedAdmin = await newAdmin.save();

        return res.status(201).json(savedAdmin);
    } catch (err) {
        return res.status(500).json(err);
    }
};
module.exports.updateOwnData = async (req, res) => {
    const adminId = req.verifiedUser._id;
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, req.body, {
            new: true,
        });

        return res.status(200).json(updatedAdmin);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.deleteAdmin = async (req, res) => {
    const adminId = req.params.adminId;
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);
        return res.status(200).json(deletedAdmin);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        return res.status(200).json(admins);
    } catch (err) {
        return res.status(500).json(err);
    }
};
module.exports.getAdmin = async (req, res) => {
    const id = req.params.adminId;
    try {
        const admin = await Admin.findById(id);
        return res.status(200).json(admin);
    } catch (err) {
        return res.status(500).json(err);
    }
};
