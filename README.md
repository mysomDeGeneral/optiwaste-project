# Optiwaste

Optiwaste is a waste collection request application built with Node.js, Express, React and MongoDB. The application enables users to request waste collection for a specified type of waste, assign the request to appropriate collectors, and manage the entire collection process.

## Table of Contents

- [Optiwaste](#optiwaste)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Backend Setup](#backend-setup)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Folder Structure](#folder-structure)
  - [Contributing](#contributing)
  - [License](#license)

## Features

## Prerequisites

- [Node.js](https://nodejs.org/) (v12.x or later)
- [MongoDB](https://www.mongodb.com/)

## Installation


### Backend Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/joshuaquarcoonii1/optiwaste-project.git
    cd optiwaste-project/backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    PORT=5000
    MONGODB_URI=your-mongodb-uri
    JWT_SECRET_KEY=your-jwt-secret
    ```

4. **Start the backend server:**

    For development (with nodemon):

    ```sh
    npm run dev
    ```


## Usage

## API Endpoints

## Folder Structure
```
optiwaste-project/
├── backend/
    ├── src/
        ├── apis/
            └── ghanaPostGPS.js
        ├── config/
            └── db.js
        ├── controllers/
            ├── collectors.js
            ├── requests.js
            └── users.js
        ├── middlewares/
            └── auth.js
        ├── models/
            ├── collector.js
            ├── request.js
            └── user.js
        ├── routes/
            ├── collectors.js
            ├── location.js
            ├── requests.js
            └── users.js
        ├── services/
            └── assignment.js
        ├── utils/
            └── jwt.js
        └── app.js
    ├── package.json
├── frontend
    └── public/
├── .gitignore
└── README.md
```


## Contributing

## License
This project is licensed under the MIT License.