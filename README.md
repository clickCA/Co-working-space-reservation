# Co-working space reservation

This project provides a backend API for managing co-working space reservations. It leverages Express.js for server-side development and MongoDB for a flexible document database.

**Prerequisites:**

- Node.js (version 14 or later recommended)
- npm (Node Package Manager) or bun (Bun is a fast JavaScript all-in-one toolkit)


Here's a guide to getting this project up and running:

**1. Create the config.env file:**

- Locate a file named `example.env` within the project directory.
- Make a copy of this file and name it `config.env`. This file will store crucial configuration settings for the project.

**2. Run docker compose up -d:**

- Open a terminal window and navigate to the project directory.
- Execute the following command:

  **Bash**

  ```bash
  docker compose up -d
  ```

 **3. Run node:**

 ```bash
  npm install
  npm run dev
  ```

  or alternatively you can use [bun.sh](https://bun.sh/)

  ```bash
    bun install
    bun run dev
  ```
