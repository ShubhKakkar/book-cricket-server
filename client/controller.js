const clientsDbHelper = require("./dbHelper");
const clientViewModel = require("./viewModel");

const clients = {};

clients.create = async ({ body }) => {
  try {
    if(!body.userId || !body.name || !body.email || !body.totalRuns) {
        return Promise.reject(
          new Error({ message: "Incomplete client information" }),
        );
    }
    const viewModel = clientViewModel.createViewModel(body);
    const newClient = await clientsDbHelper.createClient(viewModel);
    return newClient;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = clients;
