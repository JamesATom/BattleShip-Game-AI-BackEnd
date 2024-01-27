<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



# Battleship Game Backend

A backend server for the Battleship game implemented with Nest.js, TypeScript, Nodemon, Yarn, GraphQL WebSocket (graphql-ws), Apollo Server, and Fastify.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [GraphQL API](#graphql-api)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/battleship-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd server
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

### Configuration

1. Duplicate the `.env.example` file and rename it to `.env`.
2. Update the configuration values in the `.env` file as needed.

### Available Scripts

- `yarn start:dev`: Start the server in development mode with Nodemon.

## Project Structure

- `src/`: Contains the source code of the application.
  - `modules/`: Nest.js modules for different features.
  - `graphql/`: GraphQL schema, resolvers, and related files.
  - `utils/`: Utility functions.
- `config/`: Configuration files.
- `test/`: Unit and integration tests.
- `main.ts`: Entry point of the application.
- `app.module.ts`: Main module where modules are imported.

## Technologies Used

- [Nest.js](https://nestjs.com/): A progressive Node.js framework for building efficient, scalable server-side applications.
- [TypeScript](https://www.typescriptlang.org/): Superset of JavaScript with static types.
- [Nodemon](https://nodemon.io/): Monitor for changes and automatically restart the server.
- [Yarn](https://yarnpkg.com/): Package manager alternative to npm.
- [GraphQL WebSocket (graphql-ws)](https://github.com/enisdenjo/graphql-ws): WebSocket transport for GraphQL subscriptions.
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/): GraphQL server library.
- [Fastify](https://www.fastify.io/): Fast and low overhead web framework for Node.js.

## GraphQL API

The Battleship game backend provides a GraphQL API for game-related operations. Refer to the [GraphQL API Documentation](./GRAPHQL.md) for details.

## Contributing

Feel free to contribute to this project. You can open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


