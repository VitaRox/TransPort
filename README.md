# Transport

## A travel companion for Transgender Americans
A travel app to aid and assist in the safe and happy travel of transgender people in the United States (and beyond).

### For contributors:

##### To download and run the app locally for development
1. Fork or clone this repo: https://github.com/VitaRox/Transport
2. Download dependencies: in both /client and /server, run `npm init`.
3. Obtain an API key for the Google Maps Javascript API (you'll need an account; https://developers.google.com/maps/documentation/javascript/overview); enter this API key as the value of the constant in /client/.env.
4. Create a MongoDB account, create a Project, create a new Cluster in the project, ensure your machine has appropriate Network Access permissions, obtain a database connection string, and paste this as the value of the constant contained in /server/.env.
5. **run back-end app (Express)** From root of project: `cd server && npm start` (this is config'ed to run `nodemon server.js` in ./server/package.json).
6. **run front-end app (React)** From root of project: `cd client && npm start` (this is config'ed to run `nodemon server.js` in ./client/package.json).
7. Check out localhost:3000 on your browser.

####  Style guidelines:
##### Naming Git/Github branches
Contributors' Git/GH branches should follow the following form:
- name_of_contributor/issue, feature, or bug/the associated issue number/brief description of what's being done on this branch, in present-tense
e.g. VitaRox/issue/13/adds-frontend-validation-to-login-form

## Author(s)
Vita Harvey, <vita.aubergine@gmail.com>
