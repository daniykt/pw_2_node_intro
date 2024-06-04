const { Sequelize } = require('sequelize')
const fs = require('fs')


const sequelize = new Sequelize("ideias_db",
"danilopereira",
"Pereira123", {
    host: "daniloideiappb.mysql.database.azure.com",
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        // caminho para o certificado CA
          ca: fs.readFileSync(__dirname + '/DigiCertGlobalRootCA.crt')
        }
      }
})

try{
    sequelize.authenticate()
    console.log('Conectado comcom Deploy Azure Serve MySQL Flex')
}catch(error){
    console.error(`Deu erro na conexão com Azure: ${error}`)
}


module.exports = sequelize