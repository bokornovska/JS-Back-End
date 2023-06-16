const Trip = require('../models/Trip');

exports.create = (creator, tripData) => Trip.create({ ...tripData, creator });

// // populate(if want to display owner info)
exports.getAll = () => Trip.find().lean();

exports.getOne = (tripId) => Trip.findById(tripId).populate('creator');

exports.delete = (tripId) => Trip.findByIdAndDelete(tripId);

exports.edit = (tripId, tripData) => Trip.findByIdAndUpdate(tripId, tripData);

// exports.addComment = async (photoId, commentData) => {
//     const photo = await Photo.findById(photoId);

//     photo.comments.push(commentData);

//     return photo.save();
// };

exports.getByOwner = (userId) => Trip.find({creator: userId});

exports.join = async (userId, tripId) => {
    
    const trip = await Trip.findById(tripId);
    // TODO check if user has already bought the crypto
    trip.buddies.push(userId);
    trip.seats = trip.seats - 1;
    await trip.save();
};

exports.getBuddiesEmails = async (tripId) => {
    try {
      const trip = await Trip.findById(tripId).populate('buddies.user', 'email');
      
      if (!trip) {
        throw new Error('Trip not found');
      }
      
      const emails = trip.buddies.map(buddy => buddy.user.email);
      
      return emails;
    } catch (error) {
      console.error('Error getting buddies emails:', error);
      throw error;
    }
  }