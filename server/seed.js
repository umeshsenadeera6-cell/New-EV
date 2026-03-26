const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Station = require('./models/Station');

dotenv.config();

const stations = [
    {
        name: "Emerald Green Charging Hub",
        address: "123 Eco St, Green City",
        location: { type: "Point", coordinates: [79.8612, 6.9271] }, // Colombo
        chargerTypes: ["Type 2", "CCS"],
        pricePerKwh: 0.25,
        status: "Available"
    },
    {
        name: "Blue Spark Station",
        address: "45 Spark Ave, Electric Town",
        location: { type: "Point", coordinates: [79.8820, 6.9450] },
        chargerTypes: ["CCS", "CHAdeMO"],
        pricePerKwh: 0.30,
        status: "Occupied"
    },
    {
        name: "Volt Fast Charge",
        address: "78 Volt Rd, Thunder Bay",
        location: { type: "Point", coordinates: [79.8500, 6.9100] },
        chargerTypes: ["Tesla Supercharger"],
        pricePerKwh: 0.40,
        status: "Available"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
        await Station.deleteMany({});
        await Station.insertMany(stations);
        console.log("Seeded database with stations");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
