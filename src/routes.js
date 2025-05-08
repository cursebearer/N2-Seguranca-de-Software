import express from "express";
import {
  createUser,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "./controllers/userController.js";

const router = express.Router();

router.post("/cadastro", createUser);
router.get("/todos", getAllUsers);
router.get("/usuario/:id", getUserById);
router.delete("/deletar/:id", deleteUser);
router.put("/editar/:id", updateUser);


export default router;
