const express = require("express")
const listEndpoints = require("express-list-endpoints")
const usersRouter = require("./services/users");
const projectRouter = require("./services/projects")

const mongoose = require("mongoose")

const {join}= require("path")

//const problematicRoutes = require("./service/ProblematicRoutes")
const cors = require("cors")
const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} = require("./errorHandling")

const server = express()
server.use(express.static(join(__dirname, `../public`)))

const port = process.env.PORT

const loggerMiddleware = (req, res, next) => {
  console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`)
  next()
}
server.use(cors())
server.use(express.json()) // Built in middleware
server.use(loggerMiddleware)

// ROUTES
server.use("/users", loggerMiddleware, usersRouter)
server.use("/projects",loggerMiddleware, projectRouter )

// ERROR HANDLERS

server.use(notFoundHandler)
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(catchAllHandler)

console.log(listEndpoints(server))

mongoose
  .connect("mongodb://localhost:27017/StudentPro", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port)
    })
  )
  .catch((err) => console.log(err))