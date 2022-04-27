const Film = require('../models/Film')

const { Op } = require('sequelize')

// CONTROLLER DE REFERENCIA PARA INTEGRAR COM ANGULAR


// Include filmes
exports.createFilmsSave = async (req, res) => {

        const {title, url, genero, description} = req.body

        const data = {
            title,
            url,
            genero,
            description
        }

        console.log(data)
        try{

            const repost = await Film.create(data)
            res.status(201).json(repost)

        }catch(error){
            console.log(error)
        }
        console.log('CHEGOU AQUIIIII LAZARENTO VEIO')

    }

  
// Get Filmesss
exports.getAllFilms = async (req, res, next) => {
    const filmes = 'Filme'

    const films = await Film.findAll({ raw: true})

    res.status(200).json(films)
}

exports.getByIdFilms = async (req, res, next) => {
    const id = req.params.id;
    const film = await Film.findOne({where : {id : id}})

    console.log(film)
    res.status(200).json(film)
}

exports.updateFilmsSave = async (req, res, next) => {
    const id = req.body.id
    const {title, url, genero, description} = req.body

    const data = {
        title,
        url,
        genero,
        description
    }

    const updateFilm = await Film.update(data, {where: {id : id}})
    res.status(200).json(updateFilm)
}