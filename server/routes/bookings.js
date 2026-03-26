const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Create a booking
router.post('/', async (req, res) => {
    try {
        const { userId, stationId, startTime, endTime } = req.body;
        
        // Check for double booking
        const conflict = await Booking.findOne({
            stationId,
            status: { $ne: 'Cancelled' },
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });

        if (conflict) {
            return res.status(400).json({ message: 'Station is already booked for this time slot' });
        }

        const booking = new Booking({ userId, stationId, startTime, endTime });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user bookings
router.get('/user/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId }).populate('stationId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
