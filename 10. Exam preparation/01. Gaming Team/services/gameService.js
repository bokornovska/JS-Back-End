const Game = require('../models/Game');

exports.getAll = () => Game.find({}).lean();


exports.getOne = (gameId) => Game.findById(gameId).lean();

exports.buy = async (userId, gameId) => {
    
    const game = await Game.findById(gameId);
    // TODO check if user has already bought the crypto
    game.boughtBy.push(userId);
    await game.save();
};

exports.edit = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData, {runValidators: true});

exports.create = (ownerId, gamesData) => Game.create({ ...gamesData, owner: ownerId });

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);

// exports.search = async (name, paymentMethod) => {

//     let crypto = await this.getAll();

//     // const {name, paymentMethod} = req.query;
//     // const crypto = this.search(name, paymentMethod);

//     if (name) {
//         crypto = crypto.filter(x => x.name.toLowerCase() == name)
//     }

//     if (paymentMethod) {
//         crypto = crypto.filter(x => x.paymentMethod == paymentMethod)
//     }

//     return crypto;
// }