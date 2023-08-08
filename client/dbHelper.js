const clientsDbHelper = {};
const { connectionStatus } = require('../configs/configs.clients');
const Client = require('./model');

clientsDbHelper.createClient = async (data) => {
  try {
    // const startTime = new Date().getTime();
    console.log(data);
    const duplicateClient = await Client.findOne({
      client_id: data.client_id,
    });
    if(duplicateClient) {;
      return duplicateClient;
    }
    else {
      const newClient = new Client(data);
      const savedClient = await newClient.save();
      // const endTime = new Date().getTime();
      // logInfo('tokenValidation', startTime, endTime);
      return savedClient;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

clientsDbHelper.changeClientStatus = async ( _id ) => {
  const client = Client.findOne({client_id: _id});
  const status = client.connectionStatus;
  if(status=== "Connected") {
      Client.findOneAndUpdate(
        { userId: userId },
        { $set: { connectionStatus: "disconnected" } },
        { new: true },
        (err) => {
          if (err) {
            console.error(
              "Error updating user connection status:",
              err.message
            );
          }
        }
      );
  }
  else {
      Client.findOneAndUpdate(
        { userId: userId },
        { $set: { connectionStatus: "disconnected" } },
        { new: true },
        (err) => {
          if (err) {
            console.error(
              "Error updating user connection status:",
              err.message
            );
          }
        }
      );
  }
}
clientsDbHelper.allLivePlayers = async (data) => {
  try {
    // const startTime = new Date().getTime();
    const players = await Client.find({connectionStatus: "Connected"});
    // const endTime = new Date().getTime();
    // logInfo('tokenValidation', startTime, endTime);
    return players;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = clientsDbHelper;
