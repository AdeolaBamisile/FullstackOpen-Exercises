const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 }).then(result => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.log('Error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d+$/.test(v) && v.length >= 8
            },
            message: (props) => `${props.value} is not a valid phone number! Format should be XX-XXXXXXXX OR XXX-XXXXXXXX`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedPerson) => {
        returnedPerson.id = returnedPerson._id.toString()
        delete returnedPerson._id
        delete returnedPerson.__v
    }
})

module.exports = mongoose.model('Person', personSchema)