const fs = require('fs')
const http = require('http')
const port = 3000

const server = http.createServer((req, res) =>{

    fs.readFile('mensagem.html', function(err, data){
        if (!data){
            res.writeHead(500, {'Content-Type':'text/html'})
            res.write("<p>"+err+"</p>")
            return res.end()
        }
        res.writeHead(200, {'Content-Type':'text/html'})
        res.write(data)
        return res.end()

    })
   
   
    //res.statusCode = 200
    //res.setHeader('Content-Type','text/html')
    //res.end('<h1>Ola, eu seu fazer um backend! Em NodeJS.</h1>')


    //res.write('oi eu sou protocolo HTTP do Node')
    //res.end()
} )

server.listen(port, ()=>{
    console.log('Funfando na porta: ' + port)
})
    


