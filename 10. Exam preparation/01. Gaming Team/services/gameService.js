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

exports.search = async (name, platform) => {

    let games = await this.getAll();
    

    if (platform) {
        games = games.filter(x => x.platform == platform);
    }

    if (name) {
        games = games.filter(x => {
            console.log(x.name);
            console.log(name);
            x.name.toLowerCase() == name.toLowerCase()
        });
        console.log(games)
       
    }
    return games;
}