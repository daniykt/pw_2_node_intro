const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('ideias_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso ao MySQL Xamp!')
} catch (error) {
    console.error(`Não foi possível conectar: ${error}`)
}

module.exports = sequelize