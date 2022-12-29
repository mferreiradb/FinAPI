const express = require("express");
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.json({msg: "Online"})
})

app.listen(8080, () => {
  console.log("Servidor online na url http://localhost:8080");
});
