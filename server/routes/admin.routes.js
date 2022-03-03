const { updateOwnData, addAdmin, login, getAdmins, getAdmin, deleteAdmin } = require("../controllers/admin.controllers");
const IsAdmin = require("../middlewares/IsAdmin");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post("/login", login);
router.post("/addAdmin", verifyToken, IsAdmin, addAdmin);
router.delete("/:adminId", verifyToken, IsAdmin, deleteAdmin);
router.put("/me", verifyToken, IsAdmin, updateOwnData);
router.get("/:adminId", verifyToken, IsAdmin, getAdmin);
router.get("/", verifyToken, IsAdmin, getAdmins);
module.exports = router;
