const {
    updateAddress,
    deleteAddress,
    getAddress,
    getAddresses,
} = require("../controllers/address.controllers");
const router = require("express").Router();

router.post("/", createAddress);
router.put("/:addressId", updateAddress);
router.delete("/:addressId", deleteAddress);
router.get("/:addressId", getAddress);
router.get("/", getAddresses);
module.exports = router;
