# Transport

## A travel companion for Transgender Americans
A travel app to aid and assist in the safe and happy travel of transgender people in the United States (and beyond).

## Screenshots
<b>*User not logged-in*</b>
<img width="1277" alt="Screen Shot 2021-11-22 at 1 02 23 PM" src="https://user-images.githubusercontent.com/24485205/146835089-edf711b6-2737-488f-bd1a-8eddcdc4f397.png">
<b>*User Logged-In*</b>
<img width="1278" alt="Screen Shot 2021-11-22 at 1 05 25 PM" src="https://user-images.githubusercontent.com/24485205/146835150-36357494-6655-46f4-bce3-6ff6e3a8931d.png">
<b>*Making changes to, or deleting, a RePort*</b>
<img width="1271" alt="Screen Shot 2021-10-15 at 6 29 17 PM" src="https://user-images.githubusercontent.com/24485205/146835187-798ba46b-215d-4da6-803d-6c2bf993d8c8.png">
<b>*User is able to view other user-contributed RePorts without creating an account or logging in*</b>
<img width="1280" alt="Screen Shot 2021-11-22 at 1 03 03 PM" src="https://user-images.githubusercontent.com/24485205/146835193-8120ef13-ae7b-4b47-8f48-529d681d08bd.png">
<b>*Making a new RePort*</b>
<img width="1280" alt="Screen Shot 2021-11-22 at 1 06 13 PM" src="https://user-images.githubusercontent.com/24485205/146835211-be783bd9-e391-4eba-b009-8e6e6ee74ec9.png">
<b>*Page elements highlight at appropriate times, such as mouse-hover*</b>
<img width="1280" alt="Screen Shot 2021-10-15 at 6 28 30 PM" src="https://user-images.githubusercontent.com/24485205/146835222-1bab0fdc-4b44-4227-88dd-91a861421809.png">
<b>*A User who is not logged-in or who doesn't have an account, can still view RePorts but is unable to make changes to those which do not belong to them:*</b>
<img width="1274" alt="Screen Shot 2021-11-22 at 1 03 15 PM" src="https://user-images.githubusercontent.com/24485205/146835311-e8fd2588-d136-433a-bad9-2a5d11f888db.png">

## For contributors:

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
Contributors' branches should follow the following form:
- name_of_contributor/issue, feature, or bug/the associated issue number/brief description of what's being done on this branch, in present-tense
e.g. VitaRox/issue/13/adds-frontend-validation-to-login-form

## Author(s)
Vita Harvey, <vita.aubergine@gmail.com>

