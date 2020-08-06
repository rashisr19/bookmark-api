const mongoose = require('mongoose');
const { strict } = require('assert');
const Schema = mongoose.Schema;

// var bookmarkTagSchema = new Schema({
//     tag_id:  {
//         type : 
//     }
// });

var bookmarkSchema = new Schema({
    bookmark_link: {
        type : String,
        unique : true
    },
    bookmark_title: {
        type : String,
        unique : true
    },
    bookmark_created: { 
        type: Number
    },
    bookmark_updated : {
        type: Number
    },
    bookmark_publisher: {
        type : String
    },
    bookmark_tag: [Schema.Types.ObjectId]
});

var Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;