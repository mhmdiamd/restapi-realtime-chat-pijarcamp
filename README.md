<br />
<p align="center">
<div align="center">
<img height="150" src="./documentation/logo.png" alt="Dialogue" border="0"/>
</div>
  <h3 align="center">Backend Dialogue</h3>
  <p align="center">
    <a href="https://github.com/mhmdiamd/restapi-realtime-chat-pijarcamp"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://restapi-hiring-app-pijarcamp-production.up.railway.app/">View Demo</a>
    ·
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Setup .env example](#setup-env-example)
- [Rest Api](#rest-api)
- [Contributing](#contributing)
- [Related Project](#related-project)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

Dialogue is a website project aimed to facilitate real-time communication between connected users. With an easy-to-use chat feature, users can communicate with each other quickly and efficiently.

The main feature of Dialogue is the ability to create chat groups with friends or colleagues. To use Dialogue, users only need to create an account and start inviting their friends or colleagues to join the group or send private messages. Dialogue is designed to be user-friendly and accessible to all levels of users.

### Built With

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [MongoDB](https://mongodb.com/)
- and other


<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- [nodejs](https://nodejs.org/en/download/)


| Thrid Party     | npm install         |
| --------------- | ------------------- |
| [Express]       | npm i express       |
| [Nodemon]       | npm i -D nodemon       |
| [Morgan]        | npm i morgan        |
| [Dotenv]        | npm i dotenv        |
| [CORS]          | npm i cors          |
| [Eslint]        | npm i eslint        |
| [Joi]           | npm i joi           |
| [jsonwebtoken]  | npm i jsonwebtoken  |
| [cookie-parser] | npm i cookie-parser |
| [googleapis]    | npm i googleapis    |
| [mongoose]    | npm i mongoose    |

[express]: http://expressjs.com
[nodemon]: https://www.npmjs.com/package/nodemon
[morgan]: https://www.npmjs.com/package/morgan
[dotenv]: https://www.npmjs.com/package/dotenv
[cors]: https://www.npmjs.com/package/cos
[eslint]: https://eslint.org/
[joi]: https://www.npmjs.com/package/joi
[jsonwebtoken]: https://www.npmjs.com/package/jsonwebtoken
[cookie-parser]: https://www.npmjs.com/package/cookie-parser
[googleapis]: https://www.npmjs.com/package/cookie-parser
[mongoose]: https://www.npmjs.com/package/mongoose

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Postman](https://www.getpostman.com/) for testing

### Installation

- Clone This Back End Repo

```
git clone https://github.com/mhmdiamd/restapi-realtime-chat-pijarcamp.git
```

- Go To Folder Repo

```
cd restapi-realtime-chat-pijarcamp
```

- Install Module

```
npm install
```

- <a href="#setup-env-example">Setup .env</a>
- Starting application

```
  <!-- Run App -->
  npm run start:dev
```

```
  <!-- Run Linter -->
  npm run lint
```

### Setup .env example

Create .env file in your root project folder.

```env

#Mongo DB Credentials
MONGO_PATH
MONGO_USER
MONGO_PASSWORD 

# Token Secret
ACCESS_TOKEN_SECRET  
REFRESH_TOKEN_SECRET 
EMAIL_ACTIVATION_TOKEN 

# Email User For Send Email
EMAIL_SENDER
EMAIL_SENDER_PASSWORD 

# Origin Domain 
ORIGIN_DOMAIN 

# Google Service Credentials
GOOGLE_DRIVE_TYPE
GOOGLE_DRIVE_PROJECT_ID
GOOGLE_DRIVE_PRIVATE_KEY_ID
GOOGLE_DRIVE_PRIVATE_KEY 
GOOGLE_DRIVE_CLIENT_EMAIL 
GOOGLE_DRIVE_CLIENT_ID
GOOGLE_DRIVE_AUTH_URI
GOOGLE_DRIVE_TOKEN_URI 
GOOGLE_DRIVE_AUTH_PROVIDER
GOOGLE_DRIVE_CLIENT_URL
PORT 
HOST
DRIVE_CLIENT_ID 
DRIVE_CLIENT_SECRET
```

## Endpoint List

[![Run in Postman](https://run.pstmn.io/button.svg)]
<!-- (https://documenter.getpostman.com/view/23292228/2s93RUvsMo) -->

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Related Project

:rocket: [`Backend Dialogue`](https://github.com/mhmdiamd/restapi-realtime-chat-pijarcamp)

:rocket: [`Socket Dialogue`](https://github.com/mhmdiamd/socket-realtime-chat-pijarcamp)

:rocket: [`Frontend Dialogue`](https://github.com/mhmdiamd/ui-dialogue-app)

:rocket: [`Demo Dialogue`](https://iam-dialogue.vercel.app/)

<!-- CONTACT -->

## Contact

My Email : darmawanilham34@gmail.com

Project Link: [https://github.com/mhmdiamd/restapi-realtime-chat-pijarcamp/](https://github.com/mhmdiamd/restapi-realtime-chat-pijarcamp)

