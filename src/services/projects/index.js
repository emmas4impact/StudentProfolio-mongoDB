const express = require("express")
const valid = require("validator");
const ProjectSchema = require("./schema")
const q2m = require("query-to-mongo")

const projectRouter= express.Router();

projectRouter.get("/", async (req, res, next) => {
    try {
        const parsedQuery = q2m(req.query)
        const projects = await ProjectSchema.find(parsedQuery.criteria, parsedQuery.options.fields)
        .sort(parsedQuery.options.sort)
        .limit(parsedQuery.options.limit).skip(parsedQuery.options.skip)
       
        res.send({totalProjects: projects.length, projects})
      } catch (error) {
        next(error)
      }
    })
projectRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const project = await ProjectSchema.findById(id)
    if (project) {
      res.send(project)
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next("While reading projects list a problem occurred!")
  }
})

projectRouter.post("/",async (req, res, next) => {
  try {
   
    const newProject = new ProjectSchema(req.body)
    const { projectId } = await newProject.save()

    res.status(201).send(projectId)
    
    
  } catch (error) {
    next(error)
  }
})


projectRouter.put("/:id", async (req, res, next) => {
  try {
    const project = await ProjectSchema.findByIdAndUpdate(req.params.id, req.body)
    console.log(project)
    if (project) {
      res.send("Ok")
    } else {
      const error = new Error(`project with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

projectRouter.delete("/:id", async (req, res, next) => {
  try {
    const project = await ProjectSchema.findByIdAndDelete(req.params.id)
    if (project) {
      res.send("Deleted")
    } else {
      const error = new Error(`project with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = projectRouter