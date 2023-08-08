const clientViewModel = {};

clientViewModel.createViewModel = (result, connection) => {
  const viewModel = {};
  console.log(result, connection);
  // if (connection) {
  //   viewModel.connection = connection;
  // }
  if (result.clientId) {
    viewModel.client_id = result.clientId;
  }
  if (result.userId) {
    viewModel.userId = result.userId;
  }
  if(result.name) {
    viewModel.name = result.name;
  }
  if(result.email) {
    viewModel.email = result.email;
  }
  if(result.profilePhoto) {
    viewModel.profilePhoto = result.profilePhoto;
  }
  if(result.totalRuns) {
    viewModel.totalRuns = result.totalRuns;
  }
  return viewModel;
};

module.exports = clientViewModel;
