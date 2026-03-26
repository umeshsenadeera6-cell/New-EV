const express = require('express');
const Station = require('../models/Station');
const router = express.Router();

// Get all stations
router.get('/', async (req, res) => {
    try {
        const stations = await Station.find();
        res.json(stations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get station by ID
router.get('/:id', async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        if (!station) return res.status(404).json({ message: 'Station not found' });
        res.json(station);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create station (Admin only - simplification for MVP)
router.post('/', async (req, res) => {
    try {
        const station = new Station(req.body);
        await station.save();
        res.status(201).json(station);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
