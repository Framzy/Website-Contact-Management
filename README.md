# Contact Management Web Application

A web application for managing contacts and addresses, featuring user authentication, contact search, and CRUD operations through a REST API.

## Features

- **User authentication:** Register, log in, view and update the user profile, change the password, and log out.
- **Contact management:** Create, view details, update, delete, search, and paginate through contacts.
- **Address management:** Create, list, view details, update, and delete addresses associated with contacts.
- **Protected pages:** Dashboard pages check the user's authentication status.
- **Error pages:** Dedicated pages for HTTP 401, 404, and 500 errors.
- **API validation:** Request data is validated using Joi.
- **UI feedback:** Notifications with SweetAlert2, loading indicators, and Lottie animations for error pages.

## Technologies

### Frontend

- React 19
- Vite
- React Router 7
- Tailwind CSS 4
- `react-use`
- SweetAlert2
- Lottie React
- JavaScript (ES Modules)

### Backend

- Node.js
- Express 4
- PostgreSQL
- Prisma ORM
- Joi
- bcrypt
- UUID
- Winston
- Jest and Supertest for API testing

## Project Structure

```text
Website-Contact-Management/
├── Frontend/
│   ├── public/
│   └── src/
│       ├── components/     # Layout, user, contact, and form components
│       ├── hooks/          # Data-fetching, CRUD, and UI helper hooks
│       ├── lib/api/        # User, Contact, and Address API calls
│       ├── pages/          # Contact, address, and error pages
│       └── styles/
└── Backend/
    ├── docs/               # User, Contact, and Address API specifications
    ├── prisma/             # Database schema and migrations
    ├── src/
    │   ├── application/    # Express, database, and logging configuration
    │   ├── controller/
    │   ├── middleware/     # Authentication and error handling
    │   ├── route/
    │   ├── service/        # Business logic
    │   └── validation/
    └── test/               # API tests
```

## Requirements

Make sure the following are installed:

- Node.js and npm
- PostgreSQL
- Git (optional, for cloning the repository)

## Running the Application Locally

The frontend and backend run separately. Run the commands below from their respective directories.

### 1. Set Up the Database and Backend

Navigate to the backend directory:

```bash
cd Backend
npm install
```

Create a PostgreSQL database, for example `belajar_reactjs_contact_management`, then configure the database connection using the `DATABASE_URL` variable in `Backend/.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/belajar_reactjs_contact_management?schema=public"
```

You can also use a hosted PostgreSQL service such as Supabase. Set `DATABASE_URL` to the connection string provided by your database provider. For example:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"
```

Replace `USER`, `PASSWORD`, and `HOST` with the values for your database. Do not commit `.env` files or share database credentials.

Generate the Prisma Client and run the database migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

The backend reads `process.env.PORT` and defaults to port `3000` if `PORT` is not set. The backend code does not load environment variables through the `dotenv` package, so make sure `DATABASE_URL` is available in the Node.js process environment. On Node.js versions that support `--env-file`, you can start the backend with:

```bash
node --env-file=.env src/main.js
```

Run this command from the `Backend` directory. Alternatively, set `DATABASE_URL` in your terminal environment before running `npm run dev`.

By default, the backend runs at:

```text
http://localhost:3000
```

Health-check endpoint:

```text
GET http://localhost:3000/ping
```

### 2. Set Up the Frontend

Open a new terminal and navigate to the frontend directory:

```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend` directory:

```env
VITE_API_PATH=http://localhost:3000/api
```

`VITE_API_PATH` must include `/api` because the frontend API functions append paths such as `/users`, `/contacts`, and `/contacts/:contactId/addresses`.

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the Vite terminal output (usually `http://localhost:5173`).

## Available Scripts

### Frontend (`Frontend/`)

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite development server    |
| `npm run build`   | Create a production build            |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

### Backend (`Backend/`)

| Command       | Description                                |
| ------------- | ------------------------------------------ |
| `npm run dev` | Start the backend using `node src/main.js` |
| `npm start`   | Start the backend                          |
| `npm test`    | Run tests using Jest                       |

> **Note:** The backend's `dev` and `start` scripts do not automatically load the `.env` file. Make sure the required environment variables are available to the Node.js process.

## REST API Overview

All API endpoints use the `/api` prefix, except for the `/ping` health-check endpoint.

| Method   | Endpoint                                        | Access | Description                        |
| -------- | ----------------------------------------------- | ------ | ---------------------------------- |
| `POST`   | `/api/users`                                    | Public | Register a user                    |
| `POST`   | `/api/users/login`                              | Public | Log in and obtain a token          |
| `GET`    | `/api/users/current`                            | Token  | View the current user's profile    |
| `PATCH`  | `/api/users/current`                            | Token  | Update the user's name or password |
| `DELETE` | `/api/users/logout`                             | Token  | Log out                            |
| `POST`   | `/api/contacts`                                 | Token  | Create a contact                   |
| `GET`    | `/api/contacts`                                 | Token  | Search and paginate contacts       |
| `GET`    | `/api/contacts/:contactId`                      | Token  | View contact details               |
| `PUT`    | `/api/contacts/:contactId`                      | Token  | Update a contact                   |
| `DELETE` | `/api/contacts/:contactId`                      | Token  | Delete a contact                   |
| `POST`   | `/api/contacts/:contactId/addresses`            | Token  | Create an address for a contact    |
| `GET`    | `/api/contacts/:contactId/addresses`            | Token  | List a contact's addresses         |
| `GET`    | `/api/contacts/:contactId/addresses/:addressId` | Token  | View address details               |
| `PUT`    | `/api/contacts/:contactId/addresses/:addressId` | Token  | Update an address                  |
| `DELETE` | `/api/contacts/:contactId/addresses/:addressId` | Token  | Delete an address                  |
| `GET`    | `/ping`                                         | Public | Health check                       |

Authenticated endpoints require the following header:

```http
Authorization: <token>
```

The `GET /api/contacts` endpoint supports the `name`, `email`, `phone`, `page`, and `size` query parameters for contact search and pagination.

Detailed request and response specifications are available in:

- [`Backend/docs/user.md`](Backend/docs/user.md)
- [`Backend/docs/contact.md`](Backend/docs/contact.md)
- [`Backend/docs/address.md`](Backend/docs/address.md)

## Data Model

The database has three main models:

- **User** — a user account; `username` is the primary key.
- **Contact** — contact information associated with a user.
- **Address** — address information associated with a contact.

The main relationships are one-to-many: a `User` can have many `Contact` records, and a `Contact` can have many `Address` records. See `Backend/prisma/schema.prisma` for the full schema.

## Configuration Notes

- The backend enables CORS so the frontend and backend can run on different ports during development.
- User passwords are hashed using `bcrypt`.
- Protected endpoints validate tokens through authentication middleware.
- Local environment files may contain sensitive configuration. Use placeholders in documentation and never commit real credentials to the repository.
