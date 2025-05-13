export default {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  database: "usersDB",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
