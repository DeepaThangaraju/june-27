
import { userModal } from "../models/usename.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export const addUser = async (req, res) => {
    try {
        const { name, dob, email, password,role } = req.body;
        if (!name || !dob || !email || !password || !role) {
            return res.status(404).json({
                Message: "Enter all details"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 3)
        const newUser = { name, dob, email, password: hashedPassword,role };

        const addUser = await userModal(newUser);
        await addUser.save();
        return res.status(201).json({
            message: "User added successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModal.findOne({ email: email });
        if (!user) {
            return res.status(404).json({message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message:"Invalid Credentials"})
        }
        else {
            const token = JWT.sign({ user_id: user._id,role:user.role }, "htywetrt", { expiresIn: "1h" });
            return res.status(200).json({token:token})
        }
    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        })
    }
}

export const allUser = async (req, res) => {
    try {
        const users = await userModal.find();
        if (!users) {
            return res.status(404).json({
                message: "users not found"
            })
        }
        return res.status(200).json({
            message: "Users listed",
            data: users
        })
    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        })
    }
}


export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({
                message: "Please enter id"
            })
        }
        const user = await userModal.findById({ _id: id });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "User found",
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        })
    }
}

export async function deleteUserById(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({ message: "Please enter id" });
        }
        const deleteUser = await userModal.findByIdAndDelete({ _id: id });
        if (!deleteUser) {
            return res.status(404).json({
                message: "User Not found"
            })
        }
        return res.status(200).json({
            data: deleteUser
        })

    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        })
    }
}

export async function updateUserById(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).json({
                message: "id not found"
            })
        }

        const user = await userModal.findByIdAndUpdate(
            { _id: id },
            req.body
        )
        return res.status(202).json({
            message: "user get updated"
        })

    } catch (err) {
        return res.status(500).json({
            message: `${err.message}`
        })
    }
}