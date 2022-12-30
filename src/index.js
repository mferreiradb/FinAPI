const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");
const id = uuid();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Online" });
});

const customers = [
  {
    name: "Mauricio",
    cpf: "0000000000",
    id,
    statement: [{ description: "Deposito Mauricio", amount: 57.5 }, { description: 'Deposito', amount: 50 }],
  },
];

//MIDDLEWARE PARA AUTENTICAÇÃO DE EXISTENCIA DE CONTA
const acountAuth = (req, res, next) => {
  const { cpf } = req.headers;
  const customer = customers.find((customer) => customer.cpf == cpf);
  if (!customer) {
    return res.status(400).json({ error: "Conta não encontrada" });
  }
  res.customer = customer;
  return next();
};

app.post("/create/acount", (req, res) => {
  const { name, cpf } = req.body;
  const costumerExists = costumers.some((costumer) => costumer.cpf == cpf);

  if (costumerExists) {
    console.log("Titular já cadastrado");
    return res
      .status(400)
      .json({ erro: "Titular já cadastrado. Tente com um novo titular!" });
  } else {
    costumers.push({ name, cpf, id: uuid(), statement: [] });
    console.log(costumers);
    return res.status(201).send("Titular cadastrado com sucesso");
  }
});

app.get("/statement/", acountAuth, (req, res) => {
  const { customer } = res;
  console.log("Statement: " + customer.statement);
  return res.json(customer.statement);
});

app.post("/deposit", acountAuth, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = res;
  const deposit = {description, amount, createdAt: new Date().toLocaleString(), type: 'credit'}

  customer.statement.push(deposit);
  console.log(customer.statement);
  return res.status(201).json({ msg: "Valor adicionado" });
});

app.listen(8080, () => {
  console.log("Servidor online na url http://localhost:8080");
});
