const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length === 4) {
  console.log('give number or name')
  process.exit(1)
} else if (process.argv.length > 5) {
  console.log('too many arguments')
  process.exit(1)
}

const db_Interface = {
  password: process.argv[2],
  connect: async () => {
    mongoose.set('strictQuery',false)
    mongoose.connect(db_Interface.url)
  },
  sendEntry: async (objectData) => {
    console.log(objectData)
    const entry = new db_Interface.Model(objectData)

    entry.save().then(result => {
      console.log(result)
      db_Interface.disconnect()
    })
  },
  disconnect: async () => mongoose.connection.close(),
  displayContents: async () => {
    db_Interface.Model.find({}).then(result => {
      result.forEach(person => {
        console.log(person)
      })
      db_Interface.disconnect()
    })
  }

}

db_Interface.url = `mongodb+srv://hewmatt404:${db_Interface.password}@cluster0.q5fncgg.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
db_Interface.connect()
db_Interface.schema = new mongoose.Schema({ name: String, phonenumber: String })
db_Interface.Model = mongoose.model('Person', db_Interface.schema)

if (process.argv.length === 5) {
  console.log('processing entry....')
  let person = {
    name: process.argv[3],
    phonenumber: process.argv[4],
  }
  db_Interface.sendEntry(person)
} else {
  console.log('Collecting persons....')
  db_Interface.displayContents()
}

