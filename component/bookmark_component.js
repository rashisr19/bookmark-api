module.exports = function (mongo, ObjectID, url, assert, Bookmark) {
    var bookmark_module = {

        add_bookmark: function (new_bookmark, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection('Bookmark').insertOne(new_bookmark, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "Bookmark Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        view_all_bookmarks: function (callBack) {
            try {
                bookmarks = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection('Bookmark').find();
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        }
                        else {
                            bookmarks.push(doc);
                        }
                    }, function () {
                        if (bookmarks.length == 0) {
                            callBack(null, true, "No bookmarks Found");
                        }
                        else {
                            callBack(bookmarks, false, "Bookmarks Found");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


        delete_bookmark: function (id, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection('Bookmark').deleteOne({
                        "_id": new ObjectID(id)
                    }, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, true, "Bookmark Removed Successfully");
                        }
                        db.close();
                    }
                    )

                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        delete_tag_from_bookmark: function (id,tag_id ,callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection('Bookmark').updateOne({
                        "_id": new ObjectID(id)},{$pull : {bookmark_tag : {_id : tag_id}}
                    }, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "Tag Removed Successfully");
                        }
                        db.close();
                    }
                    )

                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        add_tag_to_bookmark : function(id,tag_id,callBack) {
            try{
                mongo.connect(url, { useNewUrlParser: true }, function (err, db){
                    assert.equal(null, err);
                    db.db().collection('Bookmark').updateOne({
                        "_id": new ObjectID(id)},{ $push : {bookmark_tag : tag_id}
                    }, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "Tag Updated Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        }
    }
    return bookmark_module;
}