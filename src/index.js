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
    statement: [
      {
        description: "Deposito Mauricio",
        amount: 57.5,
        type: "credit",
        createdAt: new Date('2022-12-29 15:00:00'),
      },
      {
        description: "Deposito",
        amount: 50,
        type: "credit",
        createdAt: new Date('2022-12-29 15:00:00'),
      },
    ],
  },
  {
    name: "Gabriel",
    cpf: "0000000001",
    id,
    statement: [
      {
        description: "Deposito Gabriel",
        amount: 120,
        type: "credit",
        createdAt: new Date('2022-12-29 15:00:00'),
      },
      {
        description: "Deposito",
        amount: 800.11,
        type: "credit",
        createdAt: new Date('2022-12-29 15:00:00'),
      },
    ]
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
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);
  return balance;
};

app.post("/create/acount", (req, res) => {
  const { name, cpf } = req.body;
  const customerExists = customers.some((customer) => customer.cpf == cpf);

  if (customerExists) {
    console.log("Titular já cadastrado");
    return res
      .status(400)
      .json({ erro: "Titular já cadastrado. Tente com um novo titular!" });
  } else {
    customers.push({ name, cpf, id: uuid(), statement: [] });
    console.log(customers);
    return res.status(201).json({msg: "Titular cadastrado com sucesso"});
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
  const deposit = {
    description,
    amount,
    createdAt: new Date(),
    type: "credit",
  };

  customer.statement.push(deposit);
  console.log(customer.statement);
  return res.status(201).json({ msg: "Valor adicionado" });
});

app.post("/withdraw", acountAuth, (req, res) => {
  const { amount } = req.body;
  const { customer } = req;
  const balance = getBalance(customer.statement);
  console.log(balance);

  if (balance < amount) {
    return res
      .status(400)
      .json({ error: "Saldo insuficiente", saldo: balance });
  }

  const withdraw = { amount, createdAt: new Date(), type: "debit" };

  customer.statement.push(withdraw);
  console.log(customer.statement);
  return res.status(201).json({ msg: "Valor removido", saldo: balance });
});

app.get("/statement/date", acountAuth, (req, res) => {
  const { customer } = req;
  const { date } = req.query;
  const dateFormat = new Date(date + " 00:00")

  const state = customer.statement.filter(
    (state) =>
    state.createdAt.toDateString() === new Date(dateFormat).toDateString()
  );
  console.log(state);
  return res.json(state);
});

app.put('/update', acountAuth, (req, res) => {
  const { name } = req.body
  const { customer } = req
  
  customer.name = name
  
  res.status(201).json({msg: 'Alteração realizada com sucesso'})
})

app.get('/customer', acountAuth, (req, res) => {
  const { customer } = req

  res.json({customer})
})

app.delete('/delete', acountAuth, (req, res) => {
  const { customer } = req
  
  customers.splice(customer, 1)

  return res.status(200).json({customer: customer})
})

app.get('/customers', (req, res) => {
  return res.json(customers)
})

app.listen(8080, () => {
  console.log("Servidor online na url http://localhost:8080");
});
