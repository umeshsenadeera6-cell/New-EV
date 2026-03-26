export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
}

export interface Station {
    _id: string;
    name: string;
    address: string;
    status: 'Available' | 'Occupied' | 'Under Maintenance';
    pricePerKwh: number;
    location: {
        coordinates: [number, number];
    };
    chargerTypes: string[];
    rating?: number;
}

export interface Booking {
    _id: string;
    userId: User;
    stationId: Station;
    startTime: string;
    endTime: string;
    status: 'Confirmed' | 'Ongoing' | 'Completed' | 'Cancelled';
    totalCost?: number;
}
