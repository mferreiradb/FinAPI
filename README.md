**FinAPI - API Financeira**

*Requisitos*

- [x] Deve ser possivel criar uma consta

- [x] Deve ser possivel buscar o extrato bancário

- [x] Deve ser possivel realizar um deposito

- [] Deve ser possivel realizar um saque

- [] Deve ser possivel buscar o extrato bancario do 
cliente por data

- [] Deve ser possivel atualizar os dados da conta do 
cliente

- [] Deve ser possivel obter dados da conta o cliente

- [] Deve ser possivel eletar uma conta



*Regras de negocio*

- [x] Não deve ser possivel cadastrar uma conta com CPF ja existente

- [x] Não deve ser possivel buscar o extrato em uma conta nao existente

- [x] Não deve ser possivel fazer deposito em uma conta nao existente

- [] Não deve ser possivel fazer um saque em uma conta nao existente

- [] Não deve ser possivel excluir uma conta nao existente

- [] Não deve ser possivel fazer saque quando o saldo for insuficiente

*Dependencias*

- Nodemon

        npm i -g nodemon

        npm i -D nodemon

- Express

        npm i express

- UUID
        - Biblioteca para gerar uuid
        - Necessário informar a versão do uuid que será utilizado
        - A V4 é a mais utilizada e gera numeros aleatórios

        npm i uuid

*Dados da conta*

- Name
        - Nome do titular
- ID
        - ID da conta
- CPF
        - CPF do titular
- Statement
        - Extrato da conta

*Detalhamentos*

- Validação de CPF
        - Uso da função some() para verificar se o cpf passado pelo body já existe na base de dados
        - A função some() faz uma iteração no array e retorna um valor booleano de acordo com a condição

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

- Buscar extradto
        - Utilizada a função find() para encontrar o extrato de um determinado cliente
        - Find retorna o primeiro elemento encontrado que cumpra as condições estabelecidas

                app.get('/statement/:cpf', (req, res) => {
                        const { cpf } = req.params
                        const customer = customers.find((customer) => customer.cpf == cpf)

                        console.log("Statement: " + customer.statement)
                        return res.json(customer.statement)
                })

*Middlewares*

- Funções que ficam entre as requisicoes e as respostas

- Utilizado para validações, por exemplo

- Podem ser utilizados de duas formas
        - Caso apenas alumas rotas devam utilizar, o middleware deve ser passado na rota, após a definição do endpoint
        - Caso todas as rotas devam utilizar, o middleware pode ser passado em app.use([middleware])

                const acountAuth = (req, res, next) => {
                        const { cpf } = req.params;
                        const customer = customers.find((customer) => customer.cpf == cpf);
                        if (!customer) {
                        return res.status(400).json({ error: "Conta não encontrada" });
                        }
                        res.customer = customer;
                        return next();
                };
                app.get("/statement/:cpf", acountAuth, (req, res) => {
                        const { customer } = res
                        console.log("Statement: " + customer.statement);
                        return res.json(customer.statement);
                });