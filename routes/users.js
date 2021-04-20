import express from "express";
import { signin, signup, update, getUsers, deleteUser } from "../controllers/user.js";

const router = express.Router();

// Base route: /user

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/updateProfile", update);
router.get("/get-users", getUsers);
router.delete("/delete-user/:id", deleteUser);

export default router;