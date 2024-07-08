# Rock Paper Scissors Lizard Spock Game

## Table of Contents
- [Rock Paper Scissors Lizard Spock Game](#rock-paper-scissors-lizard-spock-game)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Option 2: Using Docker](#option-2-using-docker)
        - [Frontend](#frontend-1)
      - [Backend](#backend-1)
    - [Running the Frontend](#running-the-frontend)
    - [Running the Backend](#running-the-backend)
    - [Running the Frontend Test](#running-the-frontend-test)

## Overview
Welcome to the "Rock Paper Scissors Lizard Spock" game application! This project is a modern twist on the classic game of Rock Paper Scissors, made famous by the TV show "The Big Bang Theory." In this game, we've added two additional elements: Lizard and Spock, creating a fun and strategic gameplay experience.This is a game application with a React and Typescript frontend and a Node.js/Express backend.

## Getting Started

### Prerequisites
- Node.js
- Docker (optional, for containerized setup)

### Installation
To get a local copy up and running, follow these steps.

#### Frontend
1. Navigate to the game-ui directory:
    ```sh
    cd game-ui
    ```
2. Install NPM packages:
    ```sh
    npm install
    ```
3. 

#### Backend
1. Navigate to the game-service directory:
    ```sh
    cd game-service
    ```
2. Install NPM packages:
    ```sh
    npm install
    ```

#### Option 2: Using Docker

1. Ensure Docker is installed and running on your machine.

##### Frontend
1. Navigate to the game-ui directory:
    ```sh
    cd game-ui
    ```
2. Build the Docker image:
    ```sh
    docker build -t game-ui .
    ```
#### Backend
1. Navigate to the game-service directory:
    ```sh
    cd game-service
    ```
2. Build the Docker image:
    ```sh
    docker build -t game-service  .
    ```


### Running the Frontend
To start the frontend application by npm, run:
```sh
npm start
```
To start the frontend application by Docker, run:

```
docker run -p 3000:3000 game-ui
```

### Running the Backend
To start the Backend application by npm, run:
```sh
npm start dev
```
To start the Backend application by Docker, run:

```
docker run -p 3001:3001 game-ui
```

### Running the Frontend Test
To start the frontend application by npm, run:
```sh
npm run test
```