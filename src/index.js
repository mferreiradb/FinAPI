const express = require("express");
const app = express();
const { v4: uuid } = require('uuid')
const id = uuid();

const costumers = [{name: "Mauricio", cpf: "05371957340", id},];

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Online" });
});

app.post("/create/acount", (req, res) => {
  const { name, cpf } = req.body;
  const user = { name, cpf, id, statemente: [] };

  if (costumers.length == 0) {
    costumers.push(user);
    console.log(costumers);
    return res.status(201).send('Titular cadastrado com sucesso')
  } else {
    for (let User of costumers) {
      if (User.cpf == cpf) {
        console.log("Titular já cadastrado");
        return res.send("Titular já cadastrado. Tente com um novo titular!");
      } else {
        costumers.push(user);
        console.log(costumers);
        return res.status(201).send('Titular cadastrado com sucesso')
      }
    }
  }
});

app.listen(8080, () => {
  console.log("Servidor online na url http://localhost:8080");
});
