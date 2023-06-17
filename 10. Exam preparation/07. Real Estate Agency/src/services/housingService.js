const House = require('../models/Housing');

exports.create = (ownerId, houseData) => House.create({ ...houseData, owner: ownerId });

// // populate(if want to display owner info)
exports.getAll = () => House.find().lean();

exports.getOne = (houseId) => House.findById(houseId);

exports.delete = (houseId) => House.findByIdAndDelete(houseId);

exports.edit = (houseId, houseData) => House.findByIdAndUpdate(houseId, houseData);

exports.rent = async (userId, houseId) => {
    
    const house = await House.findById(houseId);
    // TODO check if user has already bought the crypto
    house.availablePieces = house.availablePieces - 1;
    house.rented.push(userId);
    await house.save();
};

exports.search = async (type) => {

    let house = await this.getAll();
    
    // const {name, paymentMethod} = req.query;
    // const crypto = this.search(name, paymentMethod);

    if (type) {
        house = house.filter(x => x.type.toLowerCase() == type.toLowerCase())
    }

    return house;
}


// exports.addComment = async (photoId, commentData) => {
//     const photo = await Photo.findById(photoId);

//     photo.comments.push(commentData);

//     return photo.save();
// };

// exports.getByOwner = (userId) => Photo.find({owner: userId});