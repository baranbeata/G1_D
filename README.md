# G1_D
This project is a system for managing a chain of clothing stores.

## Technologies
* Java 16
* Spring
* Maven
* ReactJS
* Redux
* PostgreSQL

## Installation and running
#### Backend:
You can install Intelij Idea to run this project or simply use this command in the security directory:
```
mvn -B package --file pom.xml
```
If you would like to run tests, you can add cofiguration in Intelij or use this command in the security directory:
```
mvn -B test --file pom.xml
```
Backend side of the application runs on 8080 port (http://localhost:8080).
#### Frontend:
To run application frontend in the development mode, you can use:
```
npm install
npm start
```
in the security-frontend directory.
Open http://localhost:8081 to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.
You also have to install Java JDK.
