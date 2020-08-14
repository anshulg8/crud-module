const mongoose = require('mongoose');

// define your schema in a json variable like following:
// schema_json = {
//   name: String,
//   title: String,
//   description: String,
//   status: {
//     type: Boolean,
//     default: false
//   }
// }

const ModelSchema = new mongoose.Schema(schema_json, { timestamps: true })

module.exports = mongoose.model('Model', ModelSchema)