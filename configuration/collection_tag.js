const mongoose = require('mongoose');
const { strict } = require('assert');
const Schema = mongoose.Schema;

var tagSchema = new Schema({
    tag_title: {
        type : String,
        unique : true
    },
    tag_created: { 
        type: Number
    },
    tag_updated : {
        type: Number
    }
});

var Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;