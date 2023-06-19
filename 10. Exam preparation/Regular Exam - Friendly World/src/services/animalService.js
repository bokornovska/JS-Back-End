const Animal = require('../models/Animal');

exports.create = (ownerId, animalData) => Animal.create({ ...animalData, owner: ownerId });

exports.getAll = () => Animal.find().lean();

exports.getOne = (animalId) => Animal.findById(animalId);

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);

exports.donate = async (userId, animalId) => {
    
    const animal = await Animal.findById(animalId);
    
    animal.donations.push(userId);
  
    await animal.save();
};

exports.search = async (location) => {

    let animals = await this.getAll();

    if (location) {
        animals = animals.filter(x => x.location.toLowerCase() == location.toLowerCase())
    }

    return animals;
};