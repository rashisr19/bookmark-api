module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, Tag) {
        var tag_module = require('../component/tag_component')(mongo, ObjectID, url, assert, Tag);


        app.post('/add_tag', function (req, res) {
            try {
                const epochtime = (new Date()).getTime();
                const tag_title = req.body.tag_title;
                const tag_created = epochtime;
                const tag_updated = epochtime;
                var new_tag = {tag_title, tag_created, tag_updated};
                tag_module.add_tag(new_tag, function (result, error, message) {
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

        app.post('/delete_tag', function (req, res) {
            try {
                if (req.body.hasOwnProperty("tag_id")) {
                    tag_module.delete_tag(req.body.tag_id, function (result, error, message) {

                        if (error) {
                            res.json({ status: false, message: message });
                          } else {
                            res.json({ status: true, message: message, result: result });
                          }

                    })
                }
                else {
                    if (req.body.hasOwnProperty("tag_id") == false) {
                        res.json({ status: false, message: "id parameter is missing" });
                    }
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

        app.post('/view_all_tags', function (req, res) {
            try {

                tag_module.view_all_tags(function (result, error, message) {
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
    }
}