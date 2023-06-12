const Ad = require('../models/Ad');

exports.getAll = () => Ad.find({}).lean();

exports.getOne = (adId) => Ad.findById(adId).lean();

exports.apply = async (userId, adId) => {
    
    const ad = await Ad.findById(adId);
    // TODO check if user has already bought the crypto
    ad.usersApplied.push(userId);
    await ad.save();
};

exports.edit = (adId, adData) => Ad.findByIdAndUpdate(adId, adData, {runValidators: true});

exports.create = (authorId, adData) => Ad.create({ ...adData, author: authorId });

exports.delete = (adId) => Ad.findByIdAndDelete(adId);

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