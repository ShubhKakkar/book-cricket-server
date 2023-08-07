const clientsDbHelper = require("./dbHelper");
const clientViewModel = require("./viewModel");

const clients = {};

clients.create = async (result) => {
  try {
    if(!result.clientId || !result.userId || !result.name || !result.email || !result.totalRuns) {
        return Promise.reject(
          new Error({ message: "Incomplete client information" }),
        );
    }
    const viewModel = clientViewModel.createViewModel(result);
    const newClient = await clientsDbHelper.createClient(viewModel);
    return newClient;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = clients;
