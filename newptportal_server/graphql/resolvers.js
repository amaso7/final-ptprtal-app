
const { UserInputError, AuthenticationError } = require('apollo-server')
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/env.json')
const { Op } = require('sequelize')

module.exports = {
    Query: {
      getUsers: async (_, __, context) => {
        
         try{
          let user
          if (context.req && context.req.headers.authorization){
            const token = context.req.headers.authorization.split('Bearer ')[1]
            jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
              if(err){
                throw new AuthenticationError('NOT AUTHORIZED')
              }
              user = decodedToken
  
              
            })
          }
             const users = await User.findAll({
               where: {username: { [Op.ne]: user.username}},
             })

             return users
         } catch(err){
             console.log(err)
             throw err
         }
      },
      login: async (_, args) => {
        const { username, password } = args
        let errors = {}
  
        try {
          if (username.trim() === '')
            errors.username = 'USERNAME EMPTY!'
          if (password === '') errors.password = 'PASSWORD EMPTY!'
  
          if (Object.keys(errors).length > 0) {
            throw new UserInputError('bad input', { errors })
          }
  
          const user = await User.findOne({
            where: { username },
          })
  
          if (!user) {
            errors.username = 'USER NOT FOUND!'
            throw new UserInputError('USER NOT FOUND!', { errors })
          }
  
          const correctPassword = await bcrypt.compare(password, user.password)
  
          if (!correctPassword) {
            errors.password = 'PASSWORD INCORRECT!'
            throw new UserInputError('PASSWORD INCORRECT!', { errors })
          } 
          
          const token = jwt.sign({ username }, JWT_SECRET, {
            expiresIn: 60 * 60,
          })
  
          return {
            ...user.toJSON(),
            createdAt: user.createdAt.toISOString(),
            token,
          }
        }catch(err){
          console.log(err)
          throw err
        }
      }
    },
    Mutation: {
        register: async (_,args) => {
        let { username, email, password, confirmPassword } = args
        let errors = {}
            
        try {
            // validate input data
            if(email.trim() === '') errors.email = 'EMAIL REQUIRED!'
            if(username.trim() === '') errors.username = 'USERNAME REQUIRED!'
            if(password.trim() === '') errors.password = 'PASSWORD REQUIRED!'
            if(confirmPassword.trim() === '') errors.confirmPassword = 'MUST CONFIRM PASSWORD!'
            if (password !== confirmPassword) errors.confirmPassword = 'PASSWORDS DO NOT MATCH!'
            // checks if usernmae and email are unique
            const userByUsername = await User.findOne({ where: { username }})
            const userByEmail = await User.findOne({ where: { email }})

            if(userByUsername) errors.username = 'USERNAME ALREADY EXISTS!'
            if(userByEmail) errors.username = 'EMAIL ALREADY REGISTERED!'
            if(Object.keys(errors).length > 0){
                throw errors
            }
            // hash password w/ bcrypt
            password = await bcrypt.hash(password, 6)
            // create user
            const user = await User.create({
                username, email, password  
            })
            // return user
            return user
        } catch (err) {
          console.log(err)
          if (err.name === 'SequelizeUniqueConstraintError') {
            err.errors.forEach(
              (e) => (errors[e.path] = `${e.path} is already taken`)
            )
          } else if (err.name === 'SequelizeValidationError') {
            err.errors.forEach((e) => (errors[e.path] = e.message))
          }
          throw new UserInputError('Bad input', { errors })
        }
      },
    },
  }