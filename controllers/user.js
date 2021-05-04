import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import mongoose from "mongoose";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ "public.email": email });

        if (!existingUser) return res.status(404).json( { message: "User doesn't exist" });
        if (password) {
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.private.password);
            if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        }
        

        const token = jwt.sign({ email: existingUser.public.email, id: existingUser._id }, "test", { expiresIn: "1d" });

        res.status(200).json({ result: existingUser, token: token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, givenName, familyName} = req.body;
    try {
        const existingUser = await User.findOne({ "public.email":email });

        if(existingUser) return res.status(400).json({ message: "User already exists" });

        if (password) {
            if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });
            const hashedPassword = await bcrypt.hash(password, 12);
            const result = await User.create({ public: {firstName, lastName, email}, private: {password: hashedPassword} });
            const token = jwt.sign({ email: result.public.email, id: result.public._id }, "test", { expiresIn: "1d" });
            res.status(200).json({ result, token });
        }
        else {
            const result = await User.create({ public: {firstName:givenName, lastName:familyName, email} });
            res.status(200).json({ result });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." })
    }
}

export const update = async (req, res) => {
    const result = req.body;
    const userInfo = result.result
    console.log(userInfo);
    const _id = userInfo._id
    const publicInfo = userInfo.public;
    if (publicInfo.firstName !== "" && publicInfo.lastName !== "" && publicInfo.email !== "" && publicInfo.state !== "" && publicInfo.typesOfRuns.length !== 0) {
        userInfo.public.allFields = "✅";
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No user with that ID");
    const updatedUser = await User.findByIdAndUpdate(_id, { ...userInfo, _id}, { new: true });
    console.log("updated", updatedUser);
    res.json(updatedUser);
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID");

    try {
        await User.findByIdAndRemove(id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error.message);
    }
}