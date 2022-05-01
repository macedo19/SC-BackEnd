const User = require('../models/User')
const User_System = require('../models/User_Sistem')
const Permissions = require('../models/Permissions')
// Criptografar senhar
const bcrypt = require('bcryptjs')

// Operador Sequelize
const { Op } = require('sequelize')

// Registrar Usuário Admin
exports.registerPost = async (req, res) => {
    let {name, email, password} = ""
    // Testes no Postamn ELSE.
    if(JSON.stringify(req.body) != JSON.stringify({})){
        name = req.body.name
        email = req.body.email
        password = req.body.password
        modulo = req.body.modulo
    }else{
        name = req.query.name
        email = req.query.email
        password = req.query.password,
        modulo = req.query.modulo
    }

    // // validação de password
    // if(password != confirmpassword){
    //     //mensagem
    //     req.flash('message', 'As senhas não conferem, tente novamente!')
    //     res.render('auth/register') //A mensagem some depois que renderiza. necessita de um tratamento a parte

    //     return
    // }

    // check se user exite
    const checkIfUserExist = await User.findOne({where: {email : email}, raw: true})

    if(checkIfUserExist){
          //mensagem
          req.flash('message', 'O e-mail ja esta em uso!')
          res.render('auth/register') //A mensagem some depois que renderiza. necessita de um tratamento a parte

          return
    }

    // create password
    const salt = bcrypt.genSaltSync(10) // cria 10 caracteres randomicos
    const hashedPassWord = bcrypt.hashSync(password, salt) // gera a hash unindo a senha com os caracteres do salt

    // Objeto User
    const user = {
        name,
        email,
        password: hashedPassWord
    }


    try{
        // Salva no banco
        const createUser = await User.create(user)

        const dados_system = {
            admin: 1,
            ativo: 1,
            Usuario: createUser.id
        }

        // Salva no banco
        const createUserSystem = await User_System.create(dados_system)

        // inicializar a session
        req.session.userid = createUser.id

        req.flash('message', 'Cadastro realizado com sucesso !!')
        
        res.status(201).json(createUserSystem)
        // Salvando a sessao
        // req.session.save(() => {
            
        // })

    }catch(error){

        console.log("O erro é: " + error)
    }
    
}

// Incluindo usuário restrito
exports.registerUserRes = async (req, res) => {
    let {name, email, password} = ""
    // Testes no Postamn ELSE.
    if(JSON.stringify(req.body) != JSON.stringify({})){
        name = req.body.name
        email = req.body.email
        password = req.body.password
        modulo = req.body.modulo
    }else{
        name = req.query.name
        email = req.query.email
        password = req.query.password,
        modulo = req.query.modulo
    }

    // // validação de password
    // if(password != confirmpassword){
    //     //mensagem
    //     req.flash('message', 'As senhas não conferem, tente novamente!')
    //     res.render('auth/register') //A mensagem some depois que renderiza. necessita de um tratamento a parte

    //     return
    // }

    // check se user exite
    const checkIfUserExist = await User.findOne({where: {email : email}, raw: true})

    if(checkIfUserExist){
          //mensagem
          req.flash('message', 'O e-mail ja esta em uso!')
          res.render('auth/register') //A mensagem some depois que renderiza. necessita de um tratamento a parte

          return
    }

    // create password
    const salt = bcrypt.genSaltSync(10) // cria 10 caracteres randomicos
    const hashedPassWord = bcrypt.hashSync(password, salt) // gera a hash unindo a senha com os caracteres do salt

    // Objeto User
    const user = {
        name,
        email,
        password: hashedPassWord
    }


    try{
        // Salva no banco
        const createUser = await User.create(user)

        const dados_system = {
            admin: 0,
            ativo: 1,
            Usuario: createUser.id
        }

        // Salva no banco
        const createUserSystem = await User_System.create(dados_system)

        const data_set = {
            modulo: modulo,
            UsuarioId: createUser.id
        }

        const createPermission = await Permissions.create(data_set)

        // inicializar a session
        req.session.userid = createUser.id

        req.flash('message', 'Cadastro realizado com sucesso !!')
        
        res.status(201).json(createUserSystem)
        // Salvando a sessao
        // req.session.save(() => {
            
        // })

    }catch(error){

        console.log("O erro é: " + error)
    }
    
}

// Apenas renderizar a view (Em anális)
exports.register = async (req, res) => {
    res.render('auth/register')
}
   
// Login 
exports.loginPost = async (req, res) =>{
    let {email, password} = ""
    // Testes no Postamn ELSE.
    if(JSON.stringify(req.body) != JSON.stringify({})){
        email = req.body.email
        password = req.body.password
    }else{
        email = req.query.email
        password = req.query.password
    }

    // busca user
    const user = await User.findOne({where: {email: email}})
    const user_syst = await User.findOne({where: {Usuario: user.id}})

    // Valida e-mail
    if(!user){
        //mensagem
        req.flash('message', 'Usuário não encontrado!')
        res.render('auth/login') //A mensagem some depois que renderiza. necessita de um tratamento a parte

        return
    }

    // Compara as senhas com bcrypt -> metodo utilizado para descriptografar e comparar
    const passwordMatch = bcrypt.compareSync(password, user.password) //se nao foi iguais retorna false

    // Valida senha
    if(!passwordMatch){
        //mensagem
        req.flash('message', 'Senha inválida')
        res.render('auth/login') //A mensagem some depois que renderiza. necessita de um tratamento a parte

        return
    }

    // Valida senha
    if(!user_syst.ativo){
        //mensagem
        req.flash('message', 'Usuário não se encontra ativo')
        res.render('auth/login') //A mensagem some depois que renderiza. necessita de um tratamento a parte

        return
    }
    
        // inicializar a session
        req.session.userid = user.id

        req.flash('message', 'Autenticação realizado com sucesso !!')
        
        res.status(200).JSON(user)

        // Salvando a sessao
    //  req.session.save(() => {
            
    //  })


}


// Apenas renderizar a view (Em análise)
exports.login = async (req, res) => {
    res.render('auth/login')
}

// Get usuários restritos
exports.getAllUsers = async (req, res) => {
    let users = await User_System.findAll({
        include: User, //relacionamento
        where: {
            admin: { [Op.ne] : 1} //Op é um operador do sequelize (Busca documentação)
        }
    })

    res.status(200).json(users)

}

// Atualiza permissao permissionamento
exports.userSettings = async (req, res) => {
    let {userid, modulo} = ""
    // Testes no Postamn ELSE.
    if(JSON.stringify(req.body) != JSON.stringify({})){
        userid = req.body.id
        modulo = req.body.modulo
    }else{
        userid = req.query.id
        modulo = req.query.modulo
    }

    const data = {
        modulo: modulo,
        UsuarioId : userid
    }
    try {
        
        const resp = await Permissions.update(data, {where : {UsuarioId: userid}})

        res.status(200).json(resp)
    }catch(error){
        console.log(error)
    }
}

// Inativa usuario
exports.inativaUser = async (req, res) => {
    let { ativo, userid} = ""

      // Testes no Postamn ELSE.
    if(JSON.stringify(req.body) != JSON.stringify({})){
        userid = req.body.id
    }else{
        userid = req.query.id
    }

    data = {
        ativo : 0
    }

    try{
        const inativado = await User_System.update(data, { where : {Usuario : userid }})

        res.status(200).json(inativado)

    }catch(error){
        console.log(error)
    }
}

// Ativa User
exports.ativaUser = async (req, res) => {
    let { ativo, userid} = ""

      // Testes no Postamn ELSE.
    if(JSON.stringify(req.body) != JSON.stringify({})){
        userid = req.body.id
    }else{
        userid = req.query.id
    }

    data = {
        ativo : 1
    }

    try{
        const inativado = await User_System.update(data, { where : {Usuario : userid }})

        res.status(200).json(inativado)
        
    }catch(error){
        console.log(error)
    }
}


// Logout sistem (Em análise)
exports.logout = async (req, res) => {
    req.session.destroy() //destroi a sessao
    res.redirect('/login')
}
