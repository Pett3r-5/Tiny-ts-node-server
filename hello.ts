const {somar, subtrair, multiplicar, dividir} = require("./calculadora")
let som:number = somar(1, 2)
let sub:number = subtrair(4, 2)
let multi:number = multiplicar(2, 2)
let div:number = dividir(4, 2)

console.log(`Hello World! ${som} | ${sub} | ${multi} | ${div}`)