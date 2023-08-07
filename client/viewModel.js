const clientViewModel = {};

clientViewModel.createViewModel = (body) => {
  const viewModel = {};
  if(body.connectionId) {
    viewModel.connectionId = body.connectionId;
  }
  if (body.userId) {
    viewModel.userId = body.userId;
  }
  if(body.name) {
    viewModel.name = body.name;
  }
  if(body.email) {
    viewModel.email = body.email;
  }
  if(body.profilePhoto) {
    viewModel.profilePhoto = body.profilePhoto;
  }
  if(body.totalRuns) {
    viewModel.totalRuns = body.totalRuns;
  }
  return viewModel;
};

module.exports = clientViewModel;
