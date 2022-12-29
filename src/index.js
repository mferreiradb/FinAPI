const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Online" });
});

app.post("/create/acount", (req, res) => {
  const { name, cpf } = req.body;
  const user = { name, cpf };
  const users = [
    {
      name: "Mauricio",
      cpf: "05371957340",
    },
  ];

  if (users.length == 0) {
    users.push(user);
    console.log(users);
    return res.json([
      { msg: "Titular cadastrado com sucesso" },
      { users: users },
    ]);
  } else {
    for (let User in users) {
      if (User.cpf == user[cpf]) {
        console.log("Titular já cadastrado");
        return res.json({ erro: "Titular já cadastrado. Tente com um novo titular!" });
      } else {
        users.push(user);
        console.log(users);
        return res.json([
          { msg: "Titular cadastrado com sucesso" },
          { users: users },
        ]);
      }
    }
  }
});

app.listen(8080, () => {
  console.log("Servidor online na url http://localhost:8080");
});
