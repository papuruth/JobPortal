[![](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/images/0)](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/links/0)[![](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/images/1)](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/links/1)[![](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/images/2)](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/links/2)[![](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/images/3)](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/links/3)[![](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/images/4)](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/links/4)[![](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/images/5)](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/links/5)[![](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/images/6)](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/links/6)[![](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/images/7)](https://sourcerer.io/fame/papuruth/papuruth/JobPortal/links/7)

![Heroku](https://pyheroku-badge.herokuapp.com/?app=jobportalmern&style=flat>)
![Dependency Status](https://img.shields.io/librariesio/github/papuruth/JobPortal)
# JobPortalReactJs

## What are the features of this App?

This project contains basic feature of:
1. Portal Homepage  
2. Login and Signup  
3. Add, edit, update, delete job by company  
4. Update applied job status by company  
5. User can apply for a job(only loggedin user)  
6. can view applied job list  
7. ...manymore

## Live Application URL

### [(Live Demo)](https://jobportalmern.herokuapp.com)
This URL has the application deployed in.


## Installation and Setup Instructions

## Prerequisites

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs

### Install create-react-app
Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily.

Use the following command to install create-react-app

```bash
npm install -g create-react-app
```
#### Example:  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

## Installation (Back-End Server):

Go into the project folder 
```bash
cd jobportal
```

and type the following command to install all npm packages

```bash
npm install
```

To Start Server,  Type the following command:

```bash
npm start
```

## Installation (Front-End):

Go into the project folder 
```bash
cd client
```

and type the following command to install all npm packages

```bash
npm install
```

To Start the App,  Type the following command:

```bash
npm start
```


To Run Build,  Type the following command:

```bash
npm build
```

To Run Test Suite:  

```bash
npm test
``` 


**Explanations on the commands**

The scripts;

- `npm start`: This runs the server.js 

- `npm server`: This  give us live reloading (hot reloading) (developement)

-  `npm client`: Changes the directory into client folder and run the app on localhost 3000


- `npm build`: Changes the directory into client folder  runs build script

- `npm dev`: Runs both server and client on one terminal concurrently,

- `npm heroku-postbuild`: Heroku runs this script after it finish building. The script goes into the client folder, then install all node modules, then install any dev dependencies, `--no-shrinkwrap` is flag to prevent shrinkwrapping (shrinkwrapp locks down all dependencies' versions), then finally it finally build the app.

The Application Runs on **localhost:3000**

## Live Application URL

[(Live Demo)](https://jobportalmern.herokuapp.com)

Click on the link to see the application

## Contributing

Feel free to open issues and pull requests.!
