/**
 * Nicholas Pollender
 * provider.js
 * 
 * Model schema for providers
 */

const mongoose = require('mongoose')

const providerSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        default: 'DoeJohn'
    },
    firstName: {
        type: String,
        required: true,
        default: 'John'
    },
    lastName: {
        type: String,
        required: true,
        default: 'Doe'
    }
})

module.exports = mongoose.model('provider', providerSchema)