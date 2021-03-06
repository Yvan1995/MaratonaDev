//! configurando servidor
const express = require("express")
const server = express()

//! configurar servidor para arquivos estaticos
server.use(express.static('public'))


//habilitar body do formulario
server.use(express.urlencoded({ extended: true }))

//! configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true, // boolean
})

//lista de doadores: array.
const donors = [
    {
        name:"Diego Fernandes",
        blood:"AB+"
    },
    {
        name:"Cleiton Souza",
        blood:"B+"
    },
    {
        name:"Robson Marques",
        blood:"O+"
    },
    {
        name:"Mayk Brito",
        blood:"A-"
    },
]




//! configurar a apresentação da pagina. 
server.get("/", function(req, res) {
    return res.render("index.html", { donors})
})

server.post("/", function(req, res){
    //pegar dados do formulario.
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //coloca valores dentro do array
    donors.push({
        name: name,
        blood: blood,
    })

    return res.redirect("/")
})


//! ligar o servidor e permitir acesso na porta 3000
server.listen(3000, function() {
    console.log("iniciei server")
})