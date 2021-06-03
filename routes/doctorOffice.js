const express = require('express')
const router = express.Router()
const Clinic = require('../models/clinic')
const Provider = require('../models/provider')
const Patient = require('../models/patient')
const Avail = require('../models/availability')
const Appt = require('../models/appointment')

//search for a provider (GET)
router.get('/providers', async (req, res) => {
    try {
        const providers = await Provider.find()
        res.json(providers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//search for availabilities of a specified provider in a given time range (GET)
router.get('/avail', async (req, res) => {
    let startTime = req.body.startTime
    let endTime = req.body.endTime
    let provider = req.body.provider
    let dateRange = getDatesArray(startTime, endTime)

    try {
        const avails = await Avail.find( {
            provider: provider,
            //startTime: { "$regex": startTime }
        } )
        res.json(avails)
    } catch (err) {}
})

//book appointment with a provider at a given time (PATCH)
router.patch('/appt', (req, res) => {

})

/*
Additional operations for init or troubleshooting
*/

router.get('/avail/all', async (req, res) => {
    try {
        const avail = await Avail.find()
        res.json(avail)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//creating a provider
router.post('/providers', async (req, res) => {
    const provider = new Provider({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        ID: req.body.lastName+req.body.firstName
    })

    try {
        const newProvider = await provider.save()
        res.status(201).json(newProvider)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post('/patients', async (req, res) => {
    const patient = new Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        ID: req.body.lastName+req.body.firstName
    })

    try {
        const newPatient = await patient.save()
        res.status(201).json(newPatient)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.post('/avail', async (req, res) => {
    const avail = new Avail({
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        provider: req.body.provider
    })

    try {
        const newAvail = await avail.save()
        res.status(201).json(newAvail)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/providers/:id', getProvider, async (req, res) => {
    try {
        await res.provider.remove()
        res.json({ message: 'Deleted provider' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

/*
Functions for getting existing information
*/

async function getProvider(req, res, next) {
    let provider
    try {
        provider = await Provider.findOne( {ID: req.params.id} )
        if (provider == null) {
            return res.status(404).json({ message: 'Cannot find provider.'} )
        }
    } catch (err) {
        return res.status(500).json( {message: err.message} )
    }

    res.provider = provider
    next()
}

function getDatesArray(start, end) {
    for(var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)){
        arr.push(new Date(dt));
    }
    return arr;
}

module.exports = router