import User from "../models/User.js";
import crypto from "node:crypto";

export const createUser = async (req, res) => {

    try {
        const userToCreate = {
            id:crypto.randomUUID(),
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
        }
    
        const user = await User.create(userToCreate);
    
        res.status(200).json({ user });
    
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getAllUsers = async (req, res) => {

    try{
        const users = await User.findAll();

        res.status(200).json({ users });
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getUserById = async (req, res) => {

    try {
        const user = await User.findByPk(req.params.id);

        res.status(200).json({ user });
   } catch (err) {
        res.status(400).json(err);
   }
};

export const deleteUser = async (req, res) => {

   try {
    const user = await User.destroy({
        where: {
            id: req.params.id,
        },
        });
    
      res.status(200).json({ user });
   } catch (err) {
    res.status(400).json(err);
   }
};

export const updateUser = async (req, res) => {

    try {
        const user = await User.update(
            {
                name: req.body.name,
                age: req.body.age,
                email: req.body.email,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
    
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json(err);
    }
}
