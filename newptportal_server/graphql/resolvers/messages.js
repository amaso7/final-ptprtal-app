
const { UserInputError, AuthenticationError } = require('apollo-server')
const { Op } = require('sequelize')
const { Message, User } = require('../../models')


module.exports = {
    Query: {
        getMessages: async (parent, { from }, { user }) => {
            try {
                if (!user) throw AuthenticationError('USER NOT FOUND!')

                const otherUser = await User.findOne({
                    where: { username: from}
                })
                if(!otherUser) throw new UserInputError('USER NOT FOUND!')

                const usernames = [user.username, otherUser.username]

                const messages = await Message.findAll({
                  where: {
                    from: { [Op.in]: usernames },
                    to: { [Op.in]: usernames },
                  },
                  order: [['createdAt', 'DESC']],
                })
        
                return messages
            } catch(err){
                console.log(err)
                throw err
            }
        }
    },
    Mutation: {
      sendMessage: async (parent, {to, content}, { user }) => {
        try{
          if (!user) throw AuthenticationError('USER NOT FOUND!')

          const recipient = await User.findOne({ where: { username: to}})

          if(!recipient){
            throw new UserInputError('USER NOT FOUND!')
          }else if(recipient.username === user.username){
            throw new AuthenticationError('UNPERMITED ACTION!: YOU CANNOT SEND MESSAGES TO YOUR OWN ACCOUNT!')
          }
          if(content.trim() === ''){
            throw new UserInputError('MESSAGE IS EMPTY!')


          }
          const message = await Message.create({
            from: user.username,
            to,
            content
          })
          return message
        } catch(err){
          console.log(err)
          throw err
        }
      }
    },
}