const { default: mongoose } = require("mongoose");

const GameSchema = new mongoose.Schema ({
    created_by: {
        type: String,
        required: [true, "Client id cannot be null"]
    },
}, {
    timestamps: true,
});

module.exports = mongoose.models.Game || new mongoose.model('Game', GameSchema);