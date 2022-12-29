const express = require("express");
const app = express();
const { v4: uuid } = require('uuid')
const id = uuid();


app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Online" });
});

const costumers = [{ name: "Mauricio", cpf: "05371957340", id },];

app.post("/create/acount", (req, res) => {
  const { name, cpf } = req.body;
  const costumerExists = costumers.some((costumer) => costumer.cpf == cpf)

  if (costumerExists) {
    console.log("Titular já cadastrado");
    return res.status(400).json({erro: "Titular já cadastrado. Tente com um novo titular!"});
  } else {
    costumers.push({name, cpf, id: uuid(), statement: []});
    console.log(costumers);
    return res.status(201).send('Titular cadastrado com sucesso')
  }
});

app.listen(8080, () => {
  console.log("Servidor online na url http://localhost:8080");
});
