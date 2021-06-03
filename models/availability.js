const mongoose = require('mongoose')

const availSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true,
        default: "2021-03-14T08:00:00"
    },
    endTime: {
        type: Date,
        required: true,
        default: "2021-03-14T08:15:00"
    },
    provider: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('availability', availSchema)