# Bazar .com
**Bazar** is a virtual online bookstore project, built **ONLY** on the server side with NodeJS & Express framework. It was built in microservices approach. With each service represented as a RESTful API.

## Purpose
This project has been built in order to be submitted as a final course project for DOS (Distributed Operating Systems) Course (#10636456) presented by `Dr.Samer Arandi` At [An-Najah National University](https://www.najah.edu/en/home/).

## Project Structure
Bazar is built in two-tiered architecture, these two tiers are:
1. Back-Tier: This tier consists of 2 main microservices (Catalog, Orders).
2. Front-Tier: Works as the interface of the project which takes user requests and forwards them into the proper Back-Teir's services.

## Catalog Service
This microservice is built to maintain list of all available books with each book's ID, title, category, price & available quantity at the store.
It supports by itself three different operations (Endpoints): 
1. [GET] Query-by-item: Fetches all single book's data. Takes one query parameter being the ID of the wanted book.
2. [GET] Query-by-subject: Fetches all books which belong to a single subject/category. Takes one query parameter being the category in which the books are wanted.
3. [PATCH] update: Updates the price/quantity of a single book. Takes one query parameter being the book's ID. Also, request body of a JSON object containing the new price & the amount of (positive/negative) change in the quantity of the book.

| Endpoint | Method | Query Parameters | Request Body |
| ------ | ------ | ------ | ------ |
| Query-by-item | GET | id | ------ |
| Query-by-subject | GET | subject | ------ |
| Update | PATCH | id | {price, quantity}
<br />
Price is the new price, while the quantity is the amount of change wanted in the quantity (+10 means increase quantity by 10) - (-5 means decrease quantity by 5).

## Order Service
This microservice is built to maintain list of all ordered orders with each order's ID, book's ID, book's price at the time of the purchase, and timestamp of the order.
This service supports single endpoint, being `Purchase` that decreases the quantity of the book after making sure its quantity at the store is suffecient to perform the order.

## Front Service
This microservice's responsibility is to forward user's requests to the responsible service.
| Endpoint | Method | Responsible Service | Service's Endpoint |
| ------ | ------ | ------ | ------ |
| Info | GET | Catalog | query-by-item
| Search | GET | Catalog | query-by-subject
| Purchase | PATCH | Order | Purchase

## Technologies
- [NodeJS](https://nodejs.org/) - JavaScript runtime.
- [ExpressJS](https://expressjs.com/) - NodeJS Web Framework.
- [Nodemon](https://www.npmjs.com/package/nodemon) - NPM Package.
- [Node Fetch CommonJS](https://www.npmjs.com/package/node-fetch-commonjs) - A light-weight module that brings Fetch API to Node.js.

## Docker
Docker is used in this project because every microservice is meant to be running on a single container, with all containers connected to each other.

Docker compose is used where a base image is created with the whole code with its dependencies. Sub-images are built upon this base image in sub-Dockerfiles in order to create multiple containers with different images.

## Running This Application
Clone The Repository (Using HTTP OR SSH)
```sh
git clone git@github.com:amin-nassar/dos-bookstore-project.git
git clone https://github.com/amin-nassar/dos-bookstore-project.git
```

Run npm install to install all dependencies (optional).
```sh
npm install
```
Running this command would be important in case the code will be directly run on the machine, but for the docker images everything is handled through dockerfiles.

```sh 
ipconfig
```

Set environment variables in the .env file including the MAIN_IP variable with the previously obtained address (recommended).
```
# Example Values
CATALOG_PORT=4000
ORDER_PORT=3000
FRONT_PORT=2000
MAIN_IP=192.168.1.107
```
Build the base image (Naming Is Important).
```sh
docker build -t bookstore:latest .
```
Naming the image with a different name, will make it mandatory to change the image name in each file of (Dockerfile.catalog, Dockerfile.order, Dockerfile.server) because as previously explained, this image is not hosted on the cloud so it need to get built locally with the same name used in these files.

Build all images & run them on their containers (Individual running in not recommended).
```sh 
docker-compose up
```

## License

MIT
