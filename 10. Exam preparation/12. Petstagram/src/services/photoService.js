const Photo = require('../models/Photo');

exports.create = (ownerId, photoData) => Photo.create({ ...photoData, owner: ownerId });

// populate(if want to display owner info)
exports.getAll = () => Photo.find().lean().populate('owner');

exports.getOne = (photoId) => Photo.findById(photoId).lean().populate('owner').populate('commentList.user');

exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData);

exports.addComment = async (photoId, commentData) => {
    const photo = await Photo.findById(photoId);

    photo.commentList.push(commentData);

    return photo.save();
}