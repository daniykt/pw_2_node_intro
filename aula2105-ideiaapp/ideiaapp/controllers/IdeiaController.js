const Ideia = require('../models/Ideia')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class IdeiaController {
    static async dashboard(req, res) {
        const userId = req.session.userid
        const user = await User.findOne({
            where: {
                id: userId
            },
            include: Ideia,
            plain: true,
        })

        const ideias = user.ideia.map((result) => result.dataValues)

        let emptyIdeias = true
        if(ideias.length > 0 ) {
            emptyIdeias = false
        }
        console.log(ideias)
        console.log(emptyIdeias)

        res.render('ideias/dashboard',{ideias, emptyIdeias})
    }

    static createIdeia(req, res) {
        res.render('ideias/create')
    }

    static createIdeiaSave(req, res) {
        const ideia = {
            title: req.body.title,
            UserId: req.session.userid
        }

        Ideia.create(ideia) 
        .then(() => {
            req.flash('message', 'Pensamentos criado com sucesso')
            req.session.save(() => {
                res.redirect('/ideias/dashboard')
            })
        })
        .catch((error) => console.log(error)) 
    }

    static showIdeias(req, res){ 
        console.log(req.query)

        let search=''

        if (req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'

        if (req.query.order == 'old'){
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        Ideia.findAll({
            include: User,
            where: {
                title: {[Op.like]: `%${search}%`}
            },
            order: [['createAt', order]]
        })
        .then((data) => {
            let ideiaQtd = data.length

            if(ideiaQtd === 0) {
                ideiaQtd = false
            }

            const ideias = data.map((result) => result.get({plain: true}))

            res.render('ideias/home', {ideias, ideiaQtd, search})
        })
        .catch((error) => console.error(error))
    }

    static removeIdeia(req, res) {
        const id = req.body.id

        Ideia.destroy({where: {id: id}})
        .then(() =>{
            req.flash('message', 'Pensamento removido com sucesso')
            req.session.save(()=> {
                res.redirect('/ideia/dashboard')
            })
        })
        .catch((error) => console.error(error))
    }

    static uptadeIdeia(req, res){
        const id = req.params.id

        Ideia.findOne({where: {id:id}, raw: true})
        .then((ideia) => {
            res.render('ideias/edit', {ideia})
        })
        .catch((error) => console.error(error))
    }

    static uptadeIdeiaPost(req, res) {
        const id = req.body.id

        const ideia = {
            title: req.body.title,
            description: req.description,
        }

        Ideia.update(ideia, {where: {id: id}})
        .then(() => {
            req.flash('message', 'Pensamento Editado com sucesso!')
            req.session.save(() => {
                res.redirect('/ideia/dashboard')
            })
        })
        .catch((error) => console.error(error))
    }
}