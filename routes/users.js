import express from "express";
import { signin, signup, update, getUsers } from "../controllers/user.js";

const router = express.Router();

// Base route: /user

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/updateProfile", update);
router.get("/get-users", getUsers);

export default router;