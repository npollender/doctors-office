# doctors-office
<a href="url"><img src="https://pluralsight2.imgix.net/paths/images/javascript-542e10ea6e.png" align="left" height="50" width="50" ></a>
<a href="url"><img src="https://pluralsight2.imgix.net/paths/images/nodejs-45adbe594d.png" align="left" height="50" width="50" ></a>
<a href="url"><img src="https://img.icons8.com/color/452/mongodb.png" align="left" height="50" width="50" ></a>

<br/><br/><br/>A REST API assignment for a simplified online medical appointment booking application.

Built with Javascript, Node.js, Expressjs, and MongoDB.

The API is hosted locally, to test it, clone this repo and follow the steps below.

## The testing environment
If you would like to replicate the testing environment, here is what you will need. Download links are provided.
<br/><br/><a href="url"><img src="https://user-images.githubusercontent.com/674621/71187801-14e60a80-2280-11ea-94c9-e56576f76baf.png" align="left" height="75" width="75" ></a>
[Visual Studio Code](https://code.visualstudio.com/)
<br/>Necessary for testing the API, additionally uses the in-app terminal to launch the server.
<br/><br/>
****************************
<a href="url"><img src="https://pluralsight2.imgix.net/paths/images/nodejs-45adbe594d.png" align="left" height="75" width="75" ></a>
[Node.js](https://nodejs.org/en/)
<br/>Necessary for running the server locally.
<br/><br/>
****************************
<a href="url"><img src="https://img.icons8.com/color/452/mongodb.png" align="left" height="75" width="75" ></a>
[MongoDB](https://www.mongodb.com/try/download/community)
<br/>Necessary for storing the data.
<br/>Install MongoDBCompass (available during installion) if you would like to visualize the data.

## Running the server

1. Download the three above programs for the testing environment.
2. Clone this repository. By default, you can click the green "Code" dropdown above.
3. Launch Visual Studio Code and open the project folder. File -> Open Folder... -> Select the doctors-office folder
4. Install the REST Client extension. On the left side bar of VSC, click on the four squares and search for "REST Client", then click on install.
5. Open the terminal. View -> Terminal. Install the express and mongoose dependencies with the command "npm i express mongoose".
6. Install the development dependencies with the command "npm i --save-dev dotenv nodemon".
7. Run the command "npm run startServer". You should receive a confirmation of "Server started" and "Connected to DB". Make sure that port 3000 is open. If not, change the port in server.js (line:25) to an open port.
8. You can now test the API, open the routes folder and open the RUN_ME.rest and follow the steps within.
9. To visualize the data in a simpler manner, launch MongoDBCompass and connect to the DB with "mongodb://localhost/doctorOffice" and click on doctorOffice.
