const express = require("express");
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.json({msg: "Online"})
})

app.post('/create/acount', (req, res) => {
  const { name, cpf } = req.body
  const cpfList = ["05371957340"]
  if (cpfList.length == 0 || null) {
    cpfList.push(cpf)
    console.log(cpfList)
    return res.json({cpfList: cpfList})
  } else {
    for (let CPF in cpfList) {
      if (cpf == cpfList[CPF]) {
        console.log('CPF já cadastrado')
        return res.json({erro: 'CPF já cadastrado. Tente com um novo CPF!'})
      } else {
        cpfList.push(cpf)
        console.log(cpfList)
        return res.json([{msg: 'CPF cadastrado com sucesso'}, {cpfList: cpfList}])
      }
    }
  }
})

app.listen(8080, () => {
  console.log("Servidor online na url http://localhost:8080");
});
