# A MEAN stack Movies App

This MEAN (MongoDB, Express, Angular, Node) stack app allows users to enter details of their favorite movies and save them. A movies-list view allows users to see a list of all the saved movies, edit them and delete them. 


## Start the App
Start Angular app & install required dependencies

- Run `npm install` from the root of the project
- run `ng serve --open` to start angular 
- Open localhost://4200 on your browser


## Start Backend
- run `cd backend`
- run `npm install`
- run `nodemon` 

## Start MongoDB
I assume you have already set up MongoDB community edition in your local development system, if not then you can take the help from the following tutorial. [https://docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/)


-  You can use MongoDB Compass to see the elements stored in the database

- mongod --config /usr/local/etc/mongod.conf
- brew services start mongodb-community@5
- mongo