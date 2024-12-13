const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    zip: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    photo: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
