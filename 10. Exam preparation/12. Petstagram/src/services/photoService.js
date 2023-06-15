const Photo = require('../models/Photo');

exports.create = (ownerId, photoData) => Photo.create({ ...photoData, owner: ownerId });

