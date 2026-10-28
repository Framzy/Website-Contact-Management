# React NodeJs Contact Management Backend

## Installation

- Run the following command to install the required dependencies

```bash
npm install
npx prisma generate
```

## SetUp Database

- Run the following command to create the database

```bash
create database belajar_reactjs_contact_management

```

- Database Migration
- Setup .env file and run the following command

```bash
npx prisma migrate dev
```

## SetUp CORS

- When running the application on a computer, the Backend Project and Frontend Project will run on different HTTP Ports.

- By default, the Browser will prohibit this, and a CORS (Cross-Origin Resource Sharing) error will occur.

- So we need to allow this first. The way to do it is we need to set it up in the Backend Project by adding the cors library for ExpressJS.

```bash
npm install cors
```

- Then add the following code to the web js

```js
import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import cors from "cors"; // here

export const web = express();
web.use(express.json());
web.use(cors()); // here

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
```
