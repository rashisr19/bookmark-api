# bookmrk-api

### For installing dependencies
```npm install express mongoose mongodb assert shortid body-parser```

### For installing dev dependencies
```npm install -D nodemon```

### To run the application
```npm run dev```

### To add a bookmark
Do a POST request on http://localhost:8000/add_bookmark<br>
with passing data in the following format : <br>
{
    "bookmark_link" :  "", "bookmark_title" :  "","bookmark_publisher" : "","bookmark_tag" : [
        {"_id" : ""}
    ]
}

### To delete a bookmark
Do a POST request on http://localhost:8000/delete_bookmark<br>
with passing data in the following format : <br>
{"bookmark_id" : ""}

### To add a tag
Do a POST request on http://localhost:8000/add_tag<br>
with passing data in the following format : <br>
{ "tag_title" : ""}

### To delete a tag
Do a POST request on http://localhost:8000/delete_tag<br>
with passing data in the following format : <br>
{  "tag_id" : ""}

### To add a tag to a specific bookmark
Do a POST request on http://localhost:8000/add_tag_to_bookmark/:bookmarkId<br>
with passing data in the following format : <br>
{"bookmark_tag" :
     {"_id" : ""}
}

### To delete a tag from a specific bookmark
Do a POST request on http://localhost:8000/delete_tag_from_bookmark/:bookmarkId<br>
with passing data in the following format : <br>
{"_id" : ""}

### To view all the bookmarks
Do a POST request on http://localhost:8000/view_all_bookmarks<br>

### To view all the tags
Do a POST request on http://localhost:8000/view_all_tags<br>









