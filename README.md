# Test project using Java and React (TypeScript) for InBank

## What is it?

A decision engine which takes in personal code, loan amount, loan period in
months and returns a decision (negative or positive) and the amount.
The idea of the decision engine is to determine what would be the maximum sum, regardless of
the person requested loan amount. For example if a person applies for 4000 €, but we determine
that we would approve a larger sum then the result should be the maximum sum which we
would approve. Also in reverse, if a person applies for 4000 € and we would not approve it then
we want to return the largest sum which we would approve. If a suitable loan
amount is not found within the selected period, the decision engine should also try to find a new
suitable period.

Result: a single api endpoint and front-end application which uses the functionality.

## Technologies

- React 19
- TypeScript 5
- Webpack 5
- Hot module replacement
- Clean webpack plugin 4
- Java 21
- Spring Boot
- Spring Data JPA
- Maven
- Docker Desktop
- Lombok
- PostgreSQL DB


# How to Use

Make sure you have installed Docker Desktop and node.js.
Docker Desktop is up and running.

## Build and verify the backend project

- go to server root: ```cd inbank/back-end```
- build & run tests: ```mvn clean install```

## Run the server

```
$ mvn spring-boot:run
``` 

---

## Install frontend project dependencies

- go to client root: ```cd inbank/front-end```
- install dependencies: ```npm install```

## Now you can run the client

```
$ npm run start
``` 

### Open http://localhost:3000




