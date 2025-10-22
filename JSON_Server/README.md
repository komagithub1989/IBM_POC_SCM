Mock database using JSON-server

Npm install
npm run json:server -> This command will start the server and watch for changes in the db.json file. By default, the server will be hosted at http://localhost:3000



Test the API

1. GET all posts:
http://localhost:3000/posts

2.GET a single post by ID:
http://localhost:3000/posts/1

3. POST a new post:
http://localhost:3000/posts
With the following JSON body:
{
    "id": 3,
    "title": "New Post",
    "author": "Rohit"
}

4.PUT (Update a post):
http://localhost:3000/posts/1
Along with a new body, such as:
{
    "id": 1,
    "title": "Updated Post",
    "author": "Amit"
}

5.DELETE a post:
http://localhost:3000/posts/1