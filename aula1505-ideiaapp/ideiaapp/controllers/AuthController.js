const User = require('../models/User')
const bcrypt = require('bcryptjs')

modulo.exports = class UserController {
    static login(req, res) {
        res.render('auth/login')
    }
    static async loginPost(req, res){
        const { email, password }= req.body

        const user = await User.findOne({where: {email:{email: email}}})

        if (!user) {
            res.render('auth/login',{  
            message:'Usuário não encontrado'
        })
        return
      }

      req.session.userid = user.id 
      req.flash('messagem', 'Login realizado com sucesso!')

      req.session.save(()=> {
        res.redirect('/')
      })
    }
    static register(req, res) {
        res.render('auth/register')
    }
    
    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body

        if(password != confirmpassword) {
            req.flash('message', 'As senhas não estão IGUAIS, tente NOVAMENTE!')
            res.render('auth/registeer')
            return 
        }
        
        const checkIfUserExists = await User.findOne({where: { email:email}})

        if (checkIfUserExists) {
            req.flash('message', 'Já existe o e-mail')
            res.render('auth/login')
            return
        }

        const salt = bcrypt.genSaltSync(10)
        const hashePassword = bcrypt.hashSync(password, salt)

        const user = {
            name, 
            email,
            password: hashePassword
        }

        User.create(user) 
        .then((user) => {
            req.session.userid = user.id
            req.flash('message', 'Cadatro com sucesso')

            req.session.save(() => {
                res.redirect('/')
            })
            .catch((err) => console.error(err))
        })
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}