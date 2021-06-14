/**
 * Nicholas Pollender
 * clinic.js
 * 
 * Model schema for clinic
 */

const mongoose = require('mongoose')

const clinicSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        default: 'Pomelo'
    }
})

module.exports = mongoose.model('clinic', clinicSchema)