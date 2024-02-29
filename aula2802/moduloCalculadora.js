
module.exports = {

    calculadora(n1, n2, op) {
        switch (op) {
            case "+":
                return ((`${n1} ${op} ${n2} = ${(n1 + n2)}`))
            case "-":
                (op === "-")
                return ((`${n1} ${op} ${n2} = ${(n1 - n2)}`))
            case "*":
                (op === "*")
                return ((`${n1} ${op} ${n2} = ${(n1 * n2)}`))
            case "/":
                (op === "/")
                return ((`${n1} ${op} ${n2} = ${(n1 / n2)}`))
            default:
                return (chalk.bgRed.yellow(`Invalid Operation`)) 
       } 
    },
    cientifica(n1,n2,op) {
        switch (op) {
            case "src":
                return(`Raiz quadrada: ${n1} + ${n2} = ${Math.sqrt(n1+n2)}`)
              default:
                return(`Invalid Operation`)
        }
    }
}




