const gameDbHelper = {};
const Game = require("./model");

gameDbHelper.createGame = async (data) => {
  try {
    // const startTime = new Date().getTime();
    const newGame = new Game(data);
    const savedGame = await newGame.save();
    // const endTime = new Date().getTime();
    // logInfo('tokenValidation', startTime, endTime);
    return savedGame;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = gameDbHelper;
