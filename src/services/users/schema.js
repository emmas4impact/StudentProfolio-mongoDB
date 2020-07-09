const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const valid = require("validator");
const StudentSchema = new Schema({
    firstname: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate:{
          validator: async(value)=>{
              if(!valid.isEmail(value)){
                  throw new Error("Email is invalid")
              }else{
                  const checkEmail = await studentModel.findOne({email: value})
                  if(checkEmail){
                      throw new Error("Email already existed")
                  }
              }
              
          }
      }
     ,
      
    },
    dateOfBirth: {
      type: Date,
      
     
    },
    country: {
        type: String,
       
    },
    projects: [{
        
        type: Schema.Types.ObjectId, ref: "projects",
        
    }],
  })

  StudentSchema.post("validate", function (error, doc, next) {
    if (error) {
      error.httpStatusCode = 400
      next(error)
    } else {
      next()
    }
  })
  
  StudentSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
      error.httpStatusCode = 400
      next(error)
    } else {
      next()
    }
  })
  

const studentModel = mongoose.model("students",  StudentSchema)
module.exports = studentModel 