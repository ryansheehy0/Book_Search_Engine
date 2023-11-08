const { User } = require("../models/User")
const mongoose = require("mongoose")
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if(context.user){
        return await User.findOne({ _id: context.user._id})
      }
      throw AuthenticationError
    }
  },
  Mutation: {
    login: async (parent, {email, password}) => {
      // Get user from email
      const user = await User.findOne({email})
      if(!user) throw AuthenticationError
      // Check to make sure password is correct
      const isPasswordCorrect = await user.isPasswordCorrect(password)
      if(!isPasswordCorrect) throw AuthenticationError
      // Create new Auth
      const jwt = signToken(user)
      const auth = { jwt, user }
      // Send Auth
      return auth
    },
    addUser: async (parent, {username, email, password}) => {
      // Create new user
      const newUser = await User.create({username, email, password})
      // send new auth with the token from the context
      const jwt = signToken(newUser)
      const auth = {jwt, newUser}
      return auth
    },
    saveBook: async (parent, {bookId, authors, description, title, image, link}, context) => {
      if(!context.user) throw AuthenticationError
      const newBook = {
        bookId,
        authors,
        description,
        title,
        image,
        link
      }
      const filter = { _id: context.user._id} // Find the current user
      const update = { $push: { savedBooks: newBook }}
      return await User.findOneAndUpdate(filter, update, { new: true })
    },
    removeBook: async (parent, { bookId }, context) => {
      if(!context.user) throw AuthenticationError
      const filter = { _id: context.user._id} // Find the current user
      const update = { $pull: { savedBooks: bookId }}
      return await User.findOneAndUpdate(filter, update, { new: true })
    }
  }
}

module.exports = resolvers