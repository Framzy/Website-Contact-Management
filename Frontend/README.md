# React Contact Management Frontend

## Frontend Project

In this class, we will practice building the Frontend Project using React. We will focus on creating the Frontend Project application in the form of a SPA (Single Page Application).

And because the data is handled by the Backend, we don't need to use a Global State Management system like Redux. We only need to use React and React Router for the project.

## Token Management

In backend project app, session user is represented by token and that token need to send in every http request.

So, in Frontend project, we will keep token data in browser local storage, so we able to use in next http request. 


[https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## Setup Project

- ### Create React By Vite

```bash
npm create vite@latest react-contact-management-frontend -- --template react

npm install react-router
```

- ### React Use

  One of the popular hooks libraries in React is react-use, which contains Hooks that we can use easily.

  In this material, we will also use this library to help simplify the project creation.

  [https://github.com/streamich/react-use](https://github.com/streamich/react-use)

  ```bash
  npm install react-use
  ```

- ### Sweet Alert

  Another library we will use in this project is Sweet Alert; this is a library we can use to display better alerts compared to the default alerts from the Web Browser.

  [https://sweetalert2.github.io/](https://sweetalert2.github.io/)

  ```bash
  npm install sweetalert2
  ```

## Project Structure

- ### main

  main.jsx

- ### components

  - ### Layout

    Layout.jsx
    Dashboard.jsx
  
  - ### Commons

  - ### Contacts

  - ### Forms

  - ### Users


- ### Hooks

  - ### Crud

  - ### Fetch



- ### lib

  - ### api

    UserApi.js

  - ### alert

    alert.js

- ### Pages

  - ### addresses

  - ### Contacts

  - ### Errors

- ### Styles

## Term to Deploy
### Connect with backend and database
- Change Database url, in this condition we use supabase as database server and connect to render as backend server.
- Change Vite Api Path, in this condition we use render as backend server.
  
