const express = require("express")
const valid = require("validator");
const ProjectSchema = require("./schema")
const q2m = require("query-to-mongo")

const projectRouter= express.Router();

projectRouter.get("/", async (req, res, next) => {
    try {
        const parsedQuery = q2m(req.query)
        const users = await ProjectSchema.find(parsedQuery.criteria, parsedQuery.options.fields)
        .sort(parsedQuery.options.sort)
        .limit(parsedQuery.options.limit).skip(parsedQuery.options.skip)
       
        res.send({TotalStudents: users.length, users})
      } catch (error) {
        next(error)
      }
    })
projectRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await ProjectSchema.findById(id)
    if (user) {
      res.send(user)
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next("While reading users list a problem occurred!")
  }
})

projectRouter.post("/",async (req, res, next) => {
  try {
   
    const newUser = new ProjectSchema(req.body)
    const { _id } = await newUser.save()

    res.status(201).send(_id)
    
    
  } catch (error) {
    next(error)
  }
})

// usersRouter.post("/checkEmail",async (req, res, next) => {
//   try {
//    const emaiExist = await ProjectSchema.findOne({"email": req.body.email}).then(function(result){
//      return result !==null;
//    })
//     if(emaiExist){
//       res.send("email exits")
//     }else{
//       const newUser = new ProjectSchema(req.body)
//     const { _id } = await newUser.save()

//     res.status(201).send(_id)
//     }
    
//   } catch (error) {
//     next(error)
//   }
// })
projectRouter.put("/:id", async (req, res, next) => {
  try {
    const user = await ProjectSchema.findByIdAndUpdate(req.params.id, req.body)
    console.log(user)
    if (user) {
      res.send("Ok")
    } else {
      const error = new Error(`User with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

projectRouter.delete("/:id", async (req, res, next) => {
  try {
    const user = await ProjectSchema.findByIdAndDelete(req.params.id)
    if (user) {
      res.send("Deleted")
    } else {
      const error = new Error(`User with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = projectRouter