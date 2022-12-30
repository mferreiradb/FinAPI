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
    statement: [{ description: "Deposito Mauricio", amount: 57.5, type: 'credit' }, { description: 'Deposito', amount: 50, type: 'credit' }],
  },
];

//MIDDLEWARE PARA AUTENTICAÇÃO DE EXISTENCIA DE CONTA
const acountAuth = (req, res, next) => {
  const { cpf } = req.headers;
  const customer = customers.find((customer) => customer.cpf == cpf);
  if (!customer) {
    return res.status(400).json({ error: "Conta não encontrada" });
  }
  req.customer = customer;
  return next();
};

const getBalance = (statement) => {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount
    } else {
      return acc - operation.amount
    }
  }, 0)
  return balance
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
  const { customer } = req;
  console.log("Statement: " + customer.statement);
  return res.json(customer.statement);
});

app.post("/deposit", acountAuth, (req, res) => {
  const { description, amount } = req.body;
  const { customer } = req;
  const deposit = {description, amount, createdAt: new Date().toLocaleString(), type: 'credit'}

  customer.statement.push(deposit);
  console.log(customer.statement);
  return res.status(201).json({ msg: "Valor adicionado" });
});

app.post("/withdraw", acountAuth, (req, res) => {
  const { amount } = req.body;
  const { customer } = req;
  const balance = getBalance(customer.statement)
  console.log(balance)

  if (balance < amount) {
    return res.status(400).json({error: 'Saldo insuficiente', saldo: balance})
  }
  
  const withdraw = {amount, createdAt: new Date().toLocaleString(), type: 'debit'}

  customer.statement.push(withdraw);
  console.log(customer.statement);
  return res.status(201).json({ msg: "Valor removido", saldo: balance });
});

app.listen(8080, () => {
  console.log("Servidor online na url http://localhost:8080");
});
