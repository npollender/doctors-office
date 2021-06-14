/**
 * Nicholas Pollender
 * appointment.js
 * 
 * Model schema for appointments
 */

const mongoose = require('mongoose')

const apptSchema = new mongoose.Schema({
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
    },
    patient: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('appointment', apptSchema)