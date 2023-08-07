const gameViewModel = {};

gameViewModel.createViewModel = (result) => {
  const viewModel = {};
  if (result.clientId) {
    viewModel.created_by = result.clientId;
  }
  return viewModel;
};

module.exports = gameViewModel;
