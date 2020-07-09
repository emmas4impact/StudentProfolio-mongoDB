const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const valid = require("validator");


const ProjectSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    
   RepoUrl: {
      type: String,
      required: true,
     
    },
    LiveUrl: {
        type: String,
        required: true,
    },
    // studentId: {
    //     type: mongoose.Schema.Types.ObjectId, ref: 'students',
       
    // },
  
    
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