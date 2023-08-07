const gameDbHelper = require("./dbHelper");
const gameViewModel = require("./viewModel");

const games = {};

games.create = async (result) => {
  try {
    if (!result.clientId) {
      return Promise.reject(
        new Error({ message: "Incomplete client information" })
      );
    }
    const viewModel = gameViewModel.createViewModel(result);
    const newGame = await gameDbHelper.createGame(viewModel);
    return newGame;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = games;
