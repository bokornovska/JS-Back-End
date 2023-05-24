const Cube = require('../models/Cube');

exports.getOne = (cubeId) => Cube.findOne({cubeId});