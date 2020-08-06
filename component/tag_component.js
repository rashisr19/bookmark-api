module.exports = function (mongo, ObjectID, url, assert, Tag) {
    var tag_module = {

        add_tag: function (new_tag, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection('Tag').insertOne(new_tag, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "Tag Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


        view_all_tags: function (callBack) {
            try {
                tags = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection('Tag').find();
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        }
                        else {
                            tags.push(doc);
                        }
                    }, function () {
                        if (tags.length == 0) {
                            callBack(null, true, "No Tags Found");
                        }
                        else {
                            callBack(tags, false, "Tags Found");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        delete_tag: function (id, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection('Tag').deleteOne({
                        "_id": new ObjectID(id)
                    }, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, true, "Tag Removed Successfully");
                        }
                        db.close();
                    }
                    )

                })
            } catch (e) {
                callBack(null, true, e);
            }
        }
    }
    return tag_module;
}