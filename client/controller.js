const clientsDbHelper = require("./dbHelper");
const clientViewModel = require("./viewModel");

const clients = {};

clients.create = async (result, connection) => {
  try {
    if(!connection || !result.clientId || !result.userId || !result.name || !result.email || !result.totalRuns) {
        return Promise.reject(
          new Error({ message: "Incomplete client information" }),
        );
    }
    const viewModel = clientViewModel.createViewModel(result, connection);
    const newClient = await clientsDbHelper.createClient(viewModel);
    return newClient;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

clients.changeStatus = async (result, connection) => {
  try {
    const updatedClient = await clientsDbHelper.changeClientStatus();
    return updatedClient;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

clients.getLivePlayers = async (result) => {
  try {
    const allActivePlayers = await clientsDbHelper.allLivePlayers();
    return allActivePlayers;
  } catch (err) {
    return Promise.reject(err);
  }
};

clients.getLivePlayerByClientId = async (client_id) => {
  try {
    const player = await clientsDbHelper.findPlayerByClientId(client_id);
    return player;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = clients;
