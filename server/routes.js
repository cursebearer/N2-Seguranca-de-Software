import express from "express";
import authMiddleware from "./middleware/authmiddleware.js";
import {
  createUser,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
  loginUser,
} from "./controllers/userController.js";


const router = express.Router();

router.post("/login", loginUser)
router.post("/cadastro", createUser);

router.get("/todos", authMiddleware, getAllUsers);
router.get("/usuario/:id", authMiddleware, getUserById);
router.delete("/deletar/:id", authMiddleware, deleteUser);
router.put("/editar/:id", authMiddleware, updateUser);



export default router;
