const express = require("express");
const router = express.Router();

const {
  Register,
  Login,
  RefreshToken,
  Update,
  GetUser,
} = require("../Controller/auth.js");

const verify = require("../middleware/privateRoute");

router.get("/", verify, GetUser);
router.post("/register", Register);
router.post("/login", Login);
router.put("/:id/update", verify, Update);
router.post("/refresh", RefreshToken);

module.exports = router;
