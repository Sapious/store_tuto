module.exports = (req, res, next) => {
    if (req.verifiedUser.isAdmin) {
        next();
    } else {
        res.status(403).json("you are not an admin");
    }
};
