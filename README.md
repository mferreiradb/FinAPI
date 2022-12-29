**FinAPI - API Financeira**

*Requisitos*

- [V] Deve ser possivel criar uma consta
- [] Deve ser possivel buscar o extrato bancário
- [] Deve ser possivel realizar um deposito
- [] Deve ser possivel realizar um saque
- [] Deve ser possivel buscar o extrato bancario do cliente por data
- [] Deve ser possivel atualizar os dados da conta do cliente
- [] Deve ser possivel obter dados da conta o cliente
- [] Deve ser possivel eletar uma conta


*Regras de negocio*

- [V] Não deve ser possivel cadastrar uma conta com CPF ja existente
- [] Não deve ser possivel fazer deposito em uma contat nao existente
- [] Não deve ser possivel buscar o extrato em uma conta nao existente
- [] Não deve ser possivel fazer um saque em uma conta nao existente
- [] Não deve ser possivel excluir uma conta nao existente
- [] Não deve ser possivel fazer saque quando o saldo for insuficiente

*Dependencias*

- Nodemon

        npm i -g nodemon

        npm i -D nodemon

- Express

        npm i express

*Dados da conta*

- Name
        - Nome do titular
- ID
        - ID da conta
- CPF
        - CPF do titular
- Statement
        - Extrato da conta