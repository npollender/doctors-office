/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Nicholas Pollender                                                           *
 * doctorOffice.js                                                              *
 *                                                                              *
 * This file contains the API functions.                                        *
 * Includes the three required functions.                                       *
 * Additionally includes several more functions for troubleshooting purposes.   *
 ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//Primarily for directing data and grabbing models
const express = require('express')
const router = express.Router()
const Clinic = require('../models/clinic')
const Provider = require('../models/provider')
const Patient = require('../models/patient')
const Avail = require('../models/availability')
const Appt = require('../models/appointment')

//GET: Returns JSON array of all the providers in the clinic
router.get('/providers', async (req, res) => {
    try {
        const providers = await Provider.find()
        if (providers.length === 0) {
            res.json("There are no providers.")
        } else {
            res.json(providers)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//GET: Returns JSON array of a providers availability within a date range
router.get('/avail', async (req, res) => {
    let provider = req.body.provider
    let startDayString = req.body.startDay
    let endDayString = req.body.endDay
    try {
        if (!verifyDate(startDayString) || !verifyDate(endDayString)) { 
            throw 'Invalid date format.'
        }
        let startDay = new Date(req.body.startDay)
        let endDay = new Date(req.body.endDay)
        let dateArray = getDatesArray(startDay, endDay)
        const avail = await Avail.find({
            provider: provider,
            date: { $in: dateArray }
        })
        if (avail.length === 0) {
            res.json("No results. Try a new input.")
        } else {
            res.json(avail)
        }
    } catch (err) {
        res.status(500).json({ err })
    }
})

//POST: Adds new entry to the DB if the provider is available, then deletes said availability
router.post('/appt', async (req, res) => {
    let date = req.body.date
    let startTime = req.body.startTime
    let endTime = req.body.endTime
    let provider = req.body.provider
    let patient = req.body.patient
    try {
        if (!verifyDate(date) || !verifyTime(startTime) || !verifyTime(endTime)) { 
            throw 'Invalid date or time format.'
        }
        const avail = await Avail.findOne({
            provider: provider,
            date: date,
            startTime: startTime,
            endTime: endTime
        })
        const tmpPatient = await Patient.findOne({ ID: patient })
        if (avail == null) {
            res.json("No such availability exists.")
        } else if (tmpPatient == null) {
            res.json("No such patient exists.")
        } else {
            const appt = new Appt({
                date: date,
                startTime: startTime,
                endTime: endTime,
                provider: provider,
                patient: patient
            })
            const newAppt = await appt.save()
            await avail.remove()
            res.status(201).json(newAppt)
        }
    } catch (err) {
        res.status(500).json({ err })
    }
})

/* Below are additional functions to troubleshoot the API. Note that there is no dupe checking.
    -GET functions to visualize data.
    -POST functions to add necessary data, such as providers and availability.
    -DELETE functions to remove unwanted data.
    -General usage functions. */

//GET: Returns JSON of the availability for all providers
router.get('/avail/all', async (req, res) => {
    try {
        const avail = await Avail.find()
        res.json(avail)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//GET: Returns JSON of all appointments booked
router.get('/appt/all', async (req, res) => {
    try {
        const appt = await Appt.find()
        res.json(appt)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//GET: Returns JSON for every patient in the clinic
router.get('/patients/all', async (req, res) => {
    try {
        const patient = await Patient.find()
        res.json(patient)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//GET: Returns JSON of the clinic information
router.get('/clinic', async (req, res) => {
    try {
        const clinic = await Clinic.find()
        res.json(clinic)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//POST: Adds the clinic to the DB, only one clinic can exist
router.post('/clinic/:id', async (req, res) => {
    const clinic = new Clinic({
        ID: req.params.id
    })
    try {
        const tmpClinic = await Clinic.findOne({})
        if (tmpClinic == null) {
            const newClinic = await clinic.save()
            res.status(201).json(newClinic)
        } else {
            res.json("Only one clinic is supported.")
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//POST: Adds new provider to the DB
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

//POST: Adds new patient to the DB
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

//POST: Adds new availability to the DB
router.post('/avail', async (req, res) => {
    const avail = new Avail({
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date,
        provider: req.body.provider
    })
    try {
        const newAvail = await avail.save()
        res.status(201).json(newAvail)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//DELETE: Removes specified provider (:id) from the DB, uses below function to simplify logic (just for proof of concept)
router.delete('/providers/:id', getProvider, async (req, res) => {
    try {
        await res.provider.remove()
        res.json({ message: 'Deleted provider' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Initally implemented while learning how to use testing environment, searches for specific provider
async function getProvider(req, res, next) {
    let provider
    try {
        provider = await Provider.findOne({ ID: req.params.id })
        if (provider == null) {
            return res.status(404).json({ message: 'Cannot find provider.' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.provider = provider
    next()
}

//Takes two Date data types and generates array of all dates in between, then converts dates to a String in "YYYY-MM-DD" format
function getDatesArray(start, end) {
    let dateArray = []
    const currentDate = new Date(start)
    while (currentDate < end) {
        dateArray = [...dateArray, new Date(currentDate)]
        currentDate.setDate(currentDate.getDate() + 1)
    }
    dateArray = [...dateArray, end]
    for (let i = 0; i < dateArray.length; i++) {
        dateArray[i] = dateArray[i].toISOString().substring(0, 10)
    }
    return dateArray;
}

//Verifies that the date is in the correct format of YYYY-MM-DD, does NOT check correct month or day however (ie 9999-99-99)
function verifyDate(date) {
    let splitDate = date.split('-')
    if (splitDate.length != 3) {
        return false
    }
    for (let i = 0; i < splitDate.length; i++) {
        if (!/^\d+$/.test(splitDate[i])) {
            return false
        }
    }
    return true
}

//Verifies that the time is in the correct format of hh:mm, does NOT check for incorrect values however (ie 99:99)
function verifyTime(time) {
    let splitTime = time.split(':')
    if (splitTime.length != 2) {
        return false
    }
    for (let i = 0; i < splitTime.length; i++) {
        if (!/^\d+$/.test(splitTime[i])) {
            return false
        }
    }
    return true
}

module.exports = router