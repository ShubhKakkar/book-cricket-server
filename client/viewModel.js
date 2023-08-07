const clientViewModel = {};

clientViewModel.createViewModel = (result) => {
  const viewModel = {};
  if (result.clientId) {
    viewModel.client_id = result.clientId;
  }
  if(result.connectionId) {
    viewModel.connectionId = result.connectionId;
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
