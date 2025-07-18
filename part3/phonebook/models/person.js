const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(url)
  .then(result => {
    console.log('connected')
  })
  .catch(error => {
    console.log('error connecting to mongodb', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{5,}/.test(v)
      }
    },
    minLength: 8,
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)
