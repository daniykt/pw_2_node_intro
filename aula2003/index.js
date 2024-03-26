const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')

operation();

function operation() {
    inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?!',
        choices:[
            'Criar a conta',
            'Consultar o saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }

    ]).then((answer) => {
        const action = answer['action']

        if (action === 'Criar a conta') {
            createAccount()
        } else if (action === 'Consultar o saldo') {
            getAccountBalance()
        } else if (action === 'Depositar') {
            deposit()
        } else if (action === 'Sacar') {
            withdraw()
        }else if (action === 'Sair') {
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts Node'))
            process.exit()
        }
    })
}

function createAccount(){
    console.log(chalk.bgGreen.white('Obrigado por utilizar o Accounts Node Bank'))
    console.log(chalk.bgRed('Vamos criar sua conta agora...'))

    buildAccount()
}

function buildAccount(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Entre com nome da sua conta: '
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if (accountName === ""){
            console.error('Não é permitido contas com nomes vazios')
            operation()
        }

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)){
            console.error(chalk.bgRed.black(`A conta: ${accountName} já existe`))
            console.log(chalk.bgRed('Escolha outro nome: '))

            buildAccount(accountName)
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            `{"balance":0}`,
            function(err){
                console.error(err)
            }
        )
        console.info(chalk.bgGreen.white(`Sua conta: ${accountName} foi criada`))
        console.info(chalk.green('Pode começar a opera-la'))

        operation()
    }) 
}