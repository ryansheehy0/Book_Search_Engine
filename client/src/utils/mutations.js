import { gql } from "@apollo/client"

export const LOGIN_USER = gql`
  mutate loginUser($email: String!, $password: String!){
    login(email: $email, password: $password)
  }
`

export const ADD_USER = gql`
  mutate addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password)
  }
`

    saveBook(bookData: BookInput!): User
  input BookInput {
    bookId: String!
    authors: [String]!
    description: String!
    title: String!
    image: String!
    link: String!
  }


export const SAVE_BOOK = gql`
  mutate saveBook(){
    addUser(username: $username, email: $email, password: $password)
  }
`

export const REMOVE_BOOK = gql`
  mutate removeBook($bookId: String!){
    removeBook(bookId: $bookId)
  }
`