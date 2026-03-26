const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    address: {
        type: String,
        required: true
    },
    chargerTypes: [{
        type: String,
        enum: ['Type 2', 'CCS', 'CHAdeMO', 'Tesla Supercharger']
    }],
    pricePerKwh: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Occupied', 'Under Maintenance'],
        default: 'Available'
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, {
    timestamps: true
});

// Index for geo-spatial queries
StationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Station', StationSchema);
