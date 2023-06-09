const Auction = require('../models/Auction');

exports.getAll = () => Auction.find({}).lean();

exports.getOne = (auctionId) => Auction.findById(auctionId).lean();

// exports.wish = async (userId, bookId) => {
    
//     const book = await Book.findById(bookId);
//     // TODO check if user has already bought the crypto
//     book.wishList.push(userId);
//     await book.save();
// };

// exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData, {runValidators: true});

exports.create = (ownerId, auctionData) => Auction.create({ ...auctionData, owner: ownerId });

// exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

// exports.getMyWishBook = (userId) => Book.find({ wishList: userId}).lean();

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