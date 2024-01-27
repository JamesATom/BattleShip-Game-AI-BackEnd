
# Battleship GraphQL API Documentation

This documentation provides information on how to query the Battleship GraphQL backend built with Nest.js. The GraphQL API supports various operations for creating users, joining rooms, setting ship positions, making attacks, and more.

## Getting Started

### GraphQL Playground

The Battleship GraphQL API can be interactively explored and tested using GraphQL Playground. Access the playground at your GraphQL server endpoint, typically `http://localhost:8000/graphql`.

### Authentication

Authentication is not required for most queries, but some mutations and subscriptions may require authentication. Ensure that you have the necessary credentials when making authenticated requests.

## Queries

### Get Google Client ID

```graphql
query {
  googleClientID {
    clientID
  }
}
```

Retrieves the Google client ID used for authentication.

## Mutations

### Create User

```graphql
mutation {
  createUser(data: { name: "John Doe", email: "john@example.com", picture: "url/to/picture" }) {
    id
    name
    email
    picture
  }
}
```

Creates a new user with the provided information.

### Join Room

```graphql
mutation {
  joinRoom(data: { roomId: "123", userId: "456" }) {
    message
    statusCode
  }
}
```

Joins a user to a room with the specified ID.

### Leave Room

```graphql
mutation {
  leaveRoom(data: { userId: "456" }) {
    message
    statusCode
  }
}
```

Leaves a room for a given user.

### Set Ship Positions

```graphql
mutation {
  setShipPositions(data: { userId: "456", roomId: "123", shipPositions: "A1,A2,A3" }) {
    message
    statusCode
  }
}
```

Sets the ship positions for a user in a room.

### Leave Room During Game

```graphql
mutation {
  leaveRoomDuringGame(data: { userId: "456" }) {
    message
    statusCode
    userId
  }
}
```

Leaves a room during an ongoing game.

### Attack to Board

```graphql
mutation {
  attackToBoard(data: { roomId: "123", userId: "456", attackPosition: "A1" }) {
    isHit
    attackPosition
  }
}
```

Initiates an attack to the board in a specified room.

### You Win

```graphql
mutation {
  youWin(data: { roomId: "123", userId: "456" }) {
    message
    statusCode
  }
}
```

Declares victory in a room.

## Subscriptions

### User Added

```graphql
subscription {
  userAdded {
    id
    name
    email
    picture
    score
  }
}
```

Subscribes to new user additions.

### Ship Positions Set

```graphql
subscription {
  shipPositionsSet(data: { roomId: "123" }) {
    message
    statusCode
  }
}
```

Subscribes to ship position setting events.

### Leave Room During Game Subscription

```graphql
subscription {
  leaveRoomDuringGameSubscription(data: { roomId: "123" }) {
    message
    statusCode
    userId
  }
}
```

Subscribes to leave room events during an ongoing game.

### Attack to Board Subscription

```graphql
subscription {
  attackToBoardSubscription(data: { roomId: "123" }) {
    isHit
    attackPosition
  }
}
```

Subscribes to board attack events.

### You Win Subscription

```graphql
subscription {
  youWinSubscription(data: { roomId: "123" }) {
    message
    statusCode
  }
}
```

Subscribes to victory events in a room.
