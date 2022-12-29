const express = require("express");
const app = express();
const { v4: uuid } = require('uuid')
const id = uuid();

const customers = [{ name: "Mauricio", cpf: "0000000000", id, statement: ["0000000000", "11111111111111"] },];

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Online" });
});

app.post("/create/acount", (req, res) => {
  const { name, cpf } = req.body;
  const user = { name, cpf, id, statement: [] };

  if (customers.length == 0) {
    customers.push(user);
    console.log(customers);
    return res.status(201).send('Titular cadastrado com sucesso')
  } else {
    for (let User of customers) {
      if (User.cpf == cpf) {
        console.log("Titular já cadastrado");
        return res.send("Titular já cadastrado. Tente com um novo titular!");
      } else {
        customers.push(user);
        console.log(customers);
        return res.status(201).send('Titular cadastrado com sucesso')
      }
    }
  }
});

app.get('/statement/', (req, res) => {
  const { cpf } = req.headers
  const cust = customers.some((customer) => customer.cpf == cpf)

  if (cust) {
    const customer = customers.find((customer) => customer.cpf == cpf)

    console.log("Statement: " + customer.statement)
    return res.json(customer.statement)
  } else {
    console.log('Conta não encontrada');
    return res.status(400).json({error: "Conta não encontrada"})
  }
})

app.listen(8080, () => {
  console.log("Servidor online na url http://localhost:8080");
});
