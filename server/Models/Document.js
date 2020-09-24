const mongoose = require("mongoose");

const documentSchema = mongoose.Schema({
    //document_id: {type: Number, default: 0}, this might have to be the same as the userID maybe?
    //description: {type: String},
    user_id: {type: String},
    fieldName: {type: String},
    fileLink: {type: String},
    s3_key: {type: String},
},
{
    timestamps: true
});

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;