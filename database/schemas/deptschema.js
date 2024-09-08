const mongoose = require("mongoose");

const deptSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

const Department  = mongoose.model("Department", deptSchema);
module.exports = Department;