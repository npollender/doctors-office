const mongoose = require('mongoose')

const availSchema = new mongoose.Schema({
    startTime: {
        type: String,
        required: true,
        default: "08:00"
    },
    endTime: {
        type: String,
        required: true,
        default: "08:15"
    },
    date: {
        type: String,
        required: true,
        default: "2021-03-14"
    },
    provider: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('availability', availSchema)