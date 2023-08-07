const clientsDbHelper = {};
const Client = require('./model');

clientsDbHelper.createClient = async (data) => {
  try {
    // const startTime = new Date().getTime();
    const duplicateClient = await Client.findOne({
      client_id: data.clientId,
    });
    if(duplicateClient) {
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

module.exports = clientsDbHelper;
