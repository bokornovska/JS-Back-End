const Hotel = require("../models/Hotel");

async function getAll() {
return Hotel.find({}).lean();
}

async function getById(hotelId) {
    return Hotel.findById(hotelId).lean();
}

async function create(hotel) {
    return await Hotel.create(hotel);
}

async function update(hotelId, hotel) {
    const existing = Hotel.findById(hotelId);

    existing.name = hotel.name;
    existing.city = hotel.city;
    existing.imageUrl = hotel.imageUrl;
    existing.rooms = hotel.rooms;
    

    await existing.save();
}

async function deleteById(id) {
    
}

async function bookRoom(hotelId, userId) {
    
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    bookRoom,
};