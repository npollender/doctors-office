const mongoose = require('mongoose')

const apptSchema = new mongoose.Schema({
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    patient: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('appointment', apptSchema)