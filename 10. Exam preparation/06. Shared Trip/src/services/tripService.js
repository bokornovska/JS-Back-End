const Trip = require('../models/Trip');

exports.create = (creator, tripData) => Trip.create({ ...tripData, creator });

// // populate(if want to display owner info)
exports.getAll = () => Trip.find().lean();

exports.getOne = (tripId) => Trip.findById(tripId).populate('creator');

exports.delete = (tripId) => Trip.findByIdAndDelete(tripId);

exports.edit = (tripId, tripData) => Trip.findByIdAndUpdate(tripId, tripData);

// exports.addComment = async (photoId, commentData) => {
//     const photo = await Photo.findById(photoId);

//     photo.comments.push(commentData);

//     return photo.save();
// };

exports.getByOwner = (userId) => Trip.find({creator: userId});