import User from "../models/User.js";

export const createUser = async (req, res) => {

    try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    await User.create({ name, email, password });

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
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

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    if (user.password !== password) {
    return res.status(400).json({ message: 'Credenciais inválidas' });
  }

    res.status(200).json({ message: 'Login realizado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });
  }
};
