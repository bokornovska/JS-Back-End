const Photo = require('../models/Photo');

exports.create = (ownerId, photoData) => Photo.create({ ...photoData, owner: ownerId });

// populate(if want to display owner info)
exports.getAll = () => Photo.find().lean().populate('owner');

exports.getOne = (photoId) => Photo.findById(photoId).lean().populate('owner');

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);