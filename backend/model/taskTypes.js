const mongoose = require('mongoose');
var TaskTypesSchema = new mongoose.Schema( {
    id : String,
    name : String,
    description : String,
});
const model = mongoose.model('taskTypes',TaskTypesSchema);

module.exports = model