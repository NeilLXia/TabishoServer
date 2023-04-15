# Questions and Answers API
This project was created by:
[Neil Xia](https://www.github.com/NeilLXia)

This is an Express.js backend server API with a PostgreSQL database with CRUD functionality. The API allows users to submit questions and answers for a particular product, mark a question or answer as helpful, or report a question or answer to prevent it from being displayed on the product page. The server was tested with load balancing between two servers using NGINX while hosted on AWS. Locally, the server was run using clustering managed by PM2.
<br/> <br/>

## Tech Stack
Built with Typescript, Express.js/Node.js, PostgreSQL, NGINX, PM2

Hosted on AWS and tested with k6, loader.io, New Relic.

![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=FFFFFF)![NodeJS](https://img.shields.io/badge/Node.js-154a10?style=for-the-badge&logo=node.js)![Express](https://img.shields.io/badge/Express-FFFFFF?style=for-the-badge&logo=express&logoColor=000000)![PostgreSQL](https://img.shields.io/badge/PostgreSQL-0064a5?style=for-the-badge&logo=PostgreSQL&logoColor=FFFFFF)![NGINX](https://img.shields.io/badge/NGINX-009900?style=for-the-badge&logo=NGINX&logoColor=FFFFFF)![PM2](https://img.shields.io/static/v1?style=for-the-badge&message=PM2&color=2B037A&logo=PM2&logoColor=FFFFFF&label=)

![Amazon AWS](https://img.shields.io/static/v1?style=for-the-badge&message=Amazon+AWS&color=232F3E&logo=Amazon+AWS&logoColor=FFFFFF&label=)![New Relic](https://img.shields.io/static/v1?style=for-the-badge&message=New+Relic&color=008C99&logo=New+Relic&logoColor=FFFFFF&label=)
<br/><br/>

## Features

- CRUD operations for users, posts, and comments
- CORS handling
- Database indexing for optimized queries
- Clustering using PM2
- Load balancing and caching using NGINX
<br/><br/>

## Getting Started

To run the server, first clone the repository:

```
git clone https://github.com/yourusername/yourproject.git
```

Then install the dependencies:

```
npm install
```

You will also need to set up a PostgreSQL database and configure the environment variables in a `.env` file. Here's an example `.env` file:

```
DB_HOST="localhost"
DB_NAME="postgresDB"
DB_PORT="3001"
USERNAME="postgres"
PASSWORD="postgres"
SERVER_PORT="3000"
```

To start the server, run:
```
npm run build
```

This will start the server on port 3000. You can then use a tool like Postman to make requests to the API.
<br/><br/>

## Load Test Performance

To test the performance of the server, I used k6 and loader.io.
k6 can run load tests locally:
```
npm run k6test
```

This will run a load test with 50 virtual users for 30 seconds. You can customize the test by editing the `k6.test.ts` file.

<img src="./readme-assets/k6 test results.png" alt= “k6_test_results” width="600">

You can also use loader.io to run load tests from the cloud. Simply sign up for a free account at loader.io, create a new test, and follow the instructions to configure the test.

The following are example results for AWS hosted servers/databases using 2 servers and 1 database.

At 900 req/s for 1 minute with no initial cached data:

<img src="./readme-assets/loaderio test results 1.png" alt= “loader_test_results” width="600">
<br/><br/>

At 3000 req/s for 1 minute with some cached data:

<img src="./readme-assets/loaderio test results 1.png" alt= “loader_test_results” width="600">
<br/><br/>

## Scalability

This server has been optimized for scalability using clustering and load balancing. Clustering allows the server to use multiple CPU cores, while load balancing distributes incoming requests across multiple instances of the server.
<br/><br/>

## Database Optimization

We have optimized the database using indexing to improve query performance. Indexes have been created on the relevant columns in the questions, answers, and answer photos tables. This reduced response times by a factor of 10.
<br/><br/>

## Conclusion

This is a high-performance, scalable backend server API and database built using Express.js, Node.js, Typescript, PostgreSQL, k6, loader.io, new relic, NGINX, and AWS EC2. It has been optimized for performance and scalability, and it includes load testing and monitoring tools to help ensure that it performs well under load.



