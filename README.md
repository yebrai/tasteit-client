# Taste It

## _Your new app for tasting food_

[![TasteIt](./src/pages/intro/tasteit-main.png)](https://taste-it-app.netlify.app/)

Welcome to TasteIt.
Our app connects users from everywhere letting them to buy and sell their self-made meals so that everyone can taste those wonderful meals which have no other way of attracting people attention in the marketplace.

Made in:

- React
- Node.js
- Express
- MongoDB
- Javascript

Dependencies:
- Stripe
- Ant Design
- Axios
- Toast
- Cloudinary


### FRONT-END ROUTES


#### HOME

```http
/ 
```
| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `Link` | `/` | introduction and main page |   All users       |
| `Link` | `/home` | home with 4 categories choice |   All users     |
| `Link` | `/:type/products` | foods list |   All users       |
| `Link` | `/:productId/details` | food details |   Logged    |
| `Link` | `/profile` | profile |   Logged       |
| `Link` | `/purchases` | confirmed orders after purchase |   Logged      |
| `Link` | `/my-favourites` | favourite foods list |   Logged       |
| `Link` | `/error` | error 500 |   All users       |
| `Link` | `/*` | error 404 not found |   All users       |

### BACK-END ROUTES

#### HOME

```http
/api 
```

| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/` | to test proper API operation  | Todos         |

#### AUTH

```http
/api/auth
```

| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `POST` | `/signup` | validates sign up information |   All users  |
| `POST` | `/login` | validates log in information |   All users  |
| `POST` | `/verify` | authenticates user token |   Logged     |


#### USER

```http
/api/user
```
| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/` | gets all users information |     Logged     |
| `GET` | `/details` | gets current user information |     Logged     |
| `PATCH` | `/:userId/details` | edits user information |     Logged     |
| `DELETE` | `/:userId` | deletes a user |     Logged     |
| `PATCH` | `/cartd/add` | adds a food to the shopping cart |     Logged     |
| `GET` | `/cart` | gets shopping cart from a user |     Logged     |
| `DELETE` | `/cart/:productId/delete` | deletes a shopping cart product |     Logged     |
| `DELETE` | `/cart/delete` | deletes whole shopping cart |     Logged     |
| `GET` | `/favourites` | gets favourite user products |     Logged     |
| `GET` | `/my-favourites` | gets populated favourite products |     Logged     |
| `POST` | `/:favouriteId/delete` | deletes a favourite product |     Logged     |


#### PRODUCT

```http
/api/product
```
| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/` | gets all products |    All users      |
| `GET` | `/:type` | gets products depending on category |    All users       |
| `POST` | `/add` | registers a new food |    Logged     |
| `GET` | `/:productId/details` | gets a unique food details |    Logged     |
| `PATCH` | `/:productId/details` | edits a food details |    Logged      |
| `DELETE` | `/:productId` | deletes a product |    Logged      |
| `PATCH` | `/:productId/rate` | adds a new rating to the product |    Logged      |


#### COMMENT

```http
/api/comment
```

| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/` | gets all comments of a food |   Logged       |
| `POST` | `/:productId/add` | adds a comment to a food |     Logged     |
| `DELETE` | `/:commentId` | deletes a comment from current user |       Logged   |



#### PURCHASE

```http
/api/purchase
```

| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `GET` | `/` | gets all purchases from current user |    Logged      |
| `POST` | `/add` | registers a new purchase |    Logged    |


#### STRIPE

```http
/api/stripe
```

| METHOD    | URL      | DESCRIPTION                | PROTECTED|
| :-------- | :------- | :------------------------- |:---------|
| `POST` | `/` | registers a new payment in Stripe |    Logged      |


## Authors

- [Borja Cabello Luna](https://www.github.com/borjacabello) 
- [Iván Yebra](https://www.github.com/yebrai)


## 🛠 Skills
React, Node.js, Express, MongoDB, Javascript, CSS, HTML


## 🚀 About Us
We are Iván and Borja, Full-Stack developers from Ironhack remote course. This is our final bootcamp project (MERN stack application).


## Demo

You can test our app here --> https://taste-it-app.netlify.app/