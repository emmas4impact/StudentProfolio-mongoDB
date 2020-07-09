const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const valid = require("validator");

const ProjectSchema = new Schema({
    firstname: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    
    dateOfBirth: {
      type: Date,
      
     
    },
    country: {
        type: String,
       
    },
  })

  ProjectSchema.post("validate", function (error, doc, next) {
    if (error) {
      error.httpStatusCode = 400
      next(error)
    } else {
      next()
    }
  })
  
  ProjectSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
      error.httpStatusCode = 400
      next(error)
    } else {
      next()
    }
  })
  

const projectModel = mongoose.model("projects",  ProjectSchema)
module.exports = projectModel 