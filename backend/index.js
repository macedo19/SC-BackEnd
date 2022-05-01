// requires importantes para o desenvolvimento
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

// Express
const app = express()

// Banco
const conn = require('./db/conn')

//Models
const User = require('./models/User')
const User_Sistem = require('./models/User_Sistem')
const Permissions = require('./models/Permissions')
const Estoque = require('./models/Stock')
const Cliente = require('./models/Cliente')
const Stock = require('./models/Stock')
const Sale = require('./models/Sale')
const Sale_Product = require('./models/Sale_Product')
const Sale_Client = require('./models/Sale_Client')

//Cors
const cors = require("cors");

// Routes
const authRoutes = require('../backend/routes/authRoutes')
const clienteRoutes = require('../backend/routes/clienteRoutes')
const produtoRoutes = require('../backend/routes/produtoRoutes')
const saleRoutes = require('../backend/routes/saleRoutes')

// Controllers


// Config para obter os dados do body em Json
// ------------------------------------------------------
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())
// -----------------------------------------------


// Session middleware
app.use(
    session({
        name: "session", //nome da session
        secret: "nosso_secret", //secret para deixar mais seguro
        resave: false, //se cair a sessao ele ira ser desconectado
        saveUninitialized: false, //
        store: new FileStore({ //Aonde ela sera salva
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'), // diretorio temp seria o sessions, aqui é o caminho para salvar arquivos de sessao
        }),
        cookie: {
            secure: false, //
            maxAge: 360000, // tempo que ele dura é equivalente de 1 dia
            expires: new Date(Date.now() + 360000), //forçar expiração de 1 dia
            httpOnly: true //certificado de segurança, para poder utilizar o cookies (Usado em http pq a segurança do https é maior)
        }
    })
)

//Cors
app.use(cors())

// flash messages -> messages de status do sistema (quando ocorre alterações no banco).
app.use(flash())


// set session
app.use((req, res, next) => {
    if(req.session.userid){
        //se tiver sessao ira mandar os dados dele (se usuario nao estiver logado não entra no if)
        res.locals.session = req.session //caso usuário tenha sessao ira ser salvo os dados e mandar em todas as req de respostas
    }

    next()
})



// Routes
app.use('/', authRoutes)
app.use('/clientes/', clienteRoutes)
app.use('/produtos/', produtoRoutes)
app.use('/vendas/', saleRoutes)

// // Sincronização com banco
conn.sync().then(()=> {
    app.listen(3000)
}).catch((err) => console.log(err))

// Resetar tabela (Limpeza)
// conn.sync({force: true}).then(()=> {
//     app.listen(3000)
// }).catch((err) => console.log(err))