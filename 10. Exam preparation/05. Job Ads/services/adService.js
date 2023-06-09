const Ad = require('../models/Ad');

// exports.getAll = () => Crypto.find({}).lean();

// exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean();

// exports.buy = async (userId, cryptoId) => {
    
//     const crypto = await Crypto.findById(cryptoId);
//     // TODO check if user has already bought the crypto
//     crypto.buyers.push(userId);
//     await crypto.save();
// };

// exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData, {runValidators: true});

exports.create = (authorId, adData) => Ad.create({ ...adData, author: authorId });

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