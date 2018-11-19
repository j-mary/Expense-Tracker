# ExpenseTracker

This is a Mean Stack project. It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.1.

## To Run this project locally

Clone this repo to your local directory, from the terminal run `npm install`, then `ng build --prod`, finally,

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. 

## To test API endpoints from postman or Run the frontend and backend on seperate servers
Clone this repo to your local directory, from the terminal run `npm install`

Locate `server.js` file at the root of the project directory. In this file comment out the bellow lines of code

on line 28
`app.use(express.static(__dirname + '/dist/expense-tracker'))`

on line 37
`app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/dist/expense-tracker/index.html')));`

Run `npm start` for backend server (express). Navigate to `http://localhost:3000/`.

Run `ng serve` for frontend server (Angular). Navigate to `http://localhost:4200/`.
