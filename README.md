Google Books API search engine and refactor it to work with GraphQL API with Apollo Server

1. Set up Apollo Server to use GraphQL
2. Authentication middleware so it works with GraphQL API
3. Apollo Provider so requests can work with Apollo Server
4. Deploy to Heroku

Back end
  + auth.js
    + Update the auth middleware function to work with the GraphQL API.
  + server.js
    + Implement the Apollo Server and apply it to the Express server as middleware.
  + Schemas
    + index.js
      + Export your typeDefs and resolvers.
    + resolvers.js
      + Define the query and mutation functionality to work with the Mongoose models.
    + typeDefs.js
      + Define the necessary Query and Mutation types
        + Query
          - me: Which returns a User type.
        + Mutation
          - login: Accepts an email and password as parameters; returns an Auth type.
          - addUser: Accepts a username, email, and password as parameters; returns an Auth type.
          - saveBook: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)
          - removeBook: Accepts a book's bookId as a parameter; returns a User type.

Types:
  + User
    - _id
    - username
    - email
    - bookCount
    - savedBooks (This will be an array of the Book type.)
  + Book
    - bookId (Not the _id, but the book's id value returned from Google's Book API.)
    - authors (An array of strings, as there may be more than one author.)
    - description
    - title
    - image
    - link
  + Auth
    - token
    - user(References the user type.)

Front end:
  + queries.js
    + This will hold the query GET_ME, which will execute the me query set up using Apollo Server.
  + mutations.js
    + LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
    + ADD_USER will execute the addUser mutation.
    - SAVE_BOOK will execute the saveBook mutation
    + REMOVE_BOOK will execute the removeBook mutation.
  + App.jsx
    + Create an Apollo Provider to make every request work with the Apollo server.
  + SearchBooks.jsx
    + Use the Apollo useMutation() Hook to execute the SAVE_BOOK mutation in the handleSaveBook() function instead of the saveBook() function imported from the API file.
    + Make sure you keep the logic for saving the book's ID to state in the try...catch block!
  + SavedBooks.jsx
    + Remove the useEffect() Hook that sets the state for UserData.
    + Instead, use the useQuery() Hook to execute the GET_ME query on load and save it to a variable named userData.
    + Use the useMutation() Hook to execute the REMOVE_BOOK mutation in the handleDeleteBook() function instead of the deleteBook() function that's imported from API file. (Make sure you keep the removeBookId() function in place!)
  + SignupForm.jsx
    + Replace the addUser() functionality imported from the API file with the ADD_USER mutation functionality.
  + LoginForm.jsx
    + Replace the loginUser() functionality imported from the API file with the LOGIN_USER mutation functionality.