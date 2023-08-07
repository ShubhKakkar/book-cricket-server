const { default: mongoose } = require("mongoose");
const minRuns = require("../configs/configs.clients").min_runs;

const GameSchema = new mongoose.Schema(
  {
    connection: {
      type: String,
      requied: [true, "Connection cannot be null"],
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
