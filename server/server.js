import express from "express";
import cors from "cors";
import User from "./models/User.js";
import Sequelize  from "sequelize";
import config from "./config/database.js";
import userRoutes from "./routes.js";

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(config);
User.init(sequelize);

app.use("/usuarios", userRoutes);

sequelize
.authenticate()
.then( () => {
    console.log("Banco de dados conectado")
    app.listen(3001, () => {
        console.log("Servidor rodando na porta 3001");
      })
})
.catch( (err) => {
    console.log("Erro ao conectar banco de dados", error)
})


