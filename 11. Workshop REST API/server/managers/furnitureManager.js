const Furniture = require('../models/Furniture');

exports.create = (furnitureData) => Furniture.create(furnitureData);

exports.getAll = Furniture.find();