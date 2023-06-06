const Game = require('../models/Game');

exports.getAll = () => Game.find({}).lean();


exports.getOne = (gameId) => Game.findById(gameId).lean();

// exports.buy = async (userId, cryptoId) => {
    
//     const crypto = await Crypto.findById(cryptoId);
//     // TODO check if user has already bought the crypto
//     crypto.buyers.push(userId);
//     await crypto.save();
// };

// exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData, {runValidators: true});

exports.create = (ownerId, gamesData) => Game.create({ ...gamesData, owner: ownerId });

// exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

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