import express from "express";
import { addUser, allUser, deleteUserById, getUserById, login, updateUserById } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post("/", addUser);
router.get("/", allUser);
router.post("/login", login);
router.get("/:id", authenticate, authorize('admin'), getUserById);
router.delete("/:id",authenticate,authorize('admin'), deleteUserById);
router.patch("/:id", authenticate, authorize('admin'), updateUserById);

export default router;

