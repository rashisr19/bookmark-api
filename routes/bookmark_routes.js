module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, Bookmark) {
        var bookmark_module = require('../component/bookmark_component')(mongo, ObjectID, url, assert, Bookmark);


        app.post('/add_bookmark', function (req, res) {
            try {
                const epochtime = (new Date()).getTime();
                const bookmark_link = req.body.bookmark_link;
                const bookmark_title = req.body.bookmark_title;
                const bookmark_created = epochtime;
                const bookmark_updated = epochtime;
                const bookmark_publisher = req.body.bookmark_publisher;
                const bookmark_tag = req.body.bookmark_tag;
                var new_bookmark = {bookmark_link, bookmark_title,bookmark_created, bookmark_updated, bookmark_publisher, bookmark_tag};
                bookmark_module.add_bookmark(new_bookmark, function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        res.json({ status: true, message: message, result: result });
                    }
                })
            } catch (er) {
                console.log("error occures: " + er);
                res.json({ status: false, message: "failed at try block...!" });
            }
        });

        app.post('/delete_bookmark', function (req, res) {
            try {
                if (req.body.hasOwnProperty("bookmark_id")) {
                    bookmark_module.delete_bookmark(req.body.bookmark_id, function (result, error, message) {

                        if (error) {
                            res.json({ status: false, message: message });
                          } else {
                            res.json({ status: true, message: message, result: result });
                          }

                    })
                }
                else {
                    if (req.body.hasOwnProperty("bookmark_id") == false) {
                        res.json({ status: false, message: "id parameter is missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

        app.post('/view_all_bookmarks', function (req, res) {
            try {

                bookmark_module.view_all_bookmarks(function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        res.json({ status: true, message: message, result: result });
                    }
                })
            }
            catch (er) {
                console.log("Error Occured: " + er);
                res.json({ status: false, message: "failed at try" })
            }
        });

        app.post('/delete_tag_from_bookmark/:bookmarkId', function (req, res) {
            try {
                if(req.params.bookmarkId) {
                    const tag_id = req.body._id;
                    bookmark_module.delete_tag_from_bookmark(req.params.bookmarkId, tag_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: result });
                        }  
                    })
                }
                else {
                    res.json({ status: false, message: "id parameter missing.." })
                }
            } catch (er) {
                console.log("error occures: " + er);
                res.json({ status: false, message: "failed at try block...!" });
            }
        });


        app.post('/add_tag_to_bookmark/:bookmarkId', function (req, res) {
            try {
                if(req.params.bookmarkId) {
                    const tag_id = req.body.bookmark_tag;
                    bookmark_module.add_tag_to_bookmark(req.params.bookmarkId, tag_id, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ status: true, message: message, result: result });
                        }  
                    })
                }
                else {
                    res.json({ status: false, message: "id parameter missing.." })
                }
            } catch (er) {
                console.log("error occures: " + er);
                res.json({ status: false, message: "failed at try block...!" });
            }
        });
    }
}