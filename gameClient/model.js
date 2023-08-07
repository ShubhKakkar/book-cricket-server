const { default: mongoose } = require("mongoose");

const gameClientSchema = new mongoose.model(
  {
    gameId: {
      type: Schema.Types.ObjectId,
      ref: "Game",
      required: [true, "Game id cannot be null"],
    },
    player1: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: [true, "Client id cannot be null"],
    },
    player2: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: [true, "Client id cannot be null"],
    },
    player1ScoreBoard: [
      {
        runsScored: Number,
        totalScore: Number,
        totalOut: Number,
        timeStamp: {
          type: Date,
          default: () => Date.now(),
        },
        totalChances: Number,
      },
    ],
    player2ScoreBoard: [
      {
        runsScored: Number,
        totalScore: Number,
        totalOut: Number,
        timeStamp: {
          type: Date,
          default: () => Date.now(),
        },
        totalChances: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.GameClient || new mongoose.model('GameClient', gameClientSchema);