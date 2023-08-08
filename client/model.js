const { default: mongoose } = require("mongoose");
const { connectionStatus } = require("../configs/configs.clients");
const minRuns = require("../configs/configs.clients").min_runs;

const GameSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      required: [true, "client_id cannot be null"],
    },
    // connection: {
    //   type: JSON,
    //   requied: [true, "Connection cannot be null"],
    // },
    connectionStatus: {
      type: String,
      enums: connectionStatus,
      default: connectionStatus[0],
    },
    userId: {
      type: String,
      required: [true, "userId for client cannot be null"],
    },
    name: {
      type: String,
      required: [true, "Client name cannot be null"],
    },
    email: {
      type: String,
      required: [true, "Client email cannot be null"],
    },
    profilePhoto: {
      type: String,
    },
    totalRuns: {
      type: Number,
      min: minRuns,
      required: [true, `Client runs cannot be null or less than ${minRuns}.`],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Client || mongoose.model("Client", GameSchema);
