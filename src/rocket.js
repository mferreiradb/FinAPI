const express = require("express");
const app = express();
const { v4: uuid } = require('uuid')
const id = uuid();


app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Online" });
});

const customers = [{ name: "Mauricio", cpf: "0000000000", id, statement: ["0000000000", "11111111111111"] },];

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

app.get('/statement/:cpf', (req, res) => {
  const { cpf } = req.params
  const customer = customers.find((customer) => customer.cpf == cpf)

  if (!customer) {
    return res.status(400).json({error: "Conta não encontrada"})
  }

  console.log("Statement: " + customer.statement)
  return res.json(customer.statement)
})

app.listen(8080, () => {
  console.log("Servidor online na url http://localhost:8080");
});
