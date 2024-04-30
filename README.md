<div align="center">
    <h1>ENSTA Sign</h1>
    <h3>A project made for IN104 at <a href="ENSTA Paris">ENSTA Paris</a></h3>
    Arnaud Pelissier ‒ Seydou Sene ‒ Doris Diallo ‒ Théo Vidal<br>
    <a href="https://data-ensta.notion.site/IN104-5080e615e0284753b8b3f09e9233b825?pvs=74">Homepage</a>
</div>

The goal of this project is to develop an app for teachers to take the register using regenerating QR-codes (to prevent students sharing it).

## Project setup

First, check that you have all the following dependencies :

- Git (latest version)
- Node.Js v20 (or above) with a package manager (NPM, Yarn, pnpm...)

Clone the repository on your local machine :

```bash
git clone https://github.com/theovidal/in104 # with HTTP
git clone git@github.com:theovidal/in104     # with SSH
```

Install all the dependencies :

```bash
npm install  # with NPM
yarn install # with Yarn
pnpm install # with PNPM

cd client
(do the same command)
```

Create a `.env` file at the root of the folder (so at the same level as `index.js`) and populate it with the values given in the [example .env](../.env.example).

## Run a development server

Run the API server :

```bash
npm run serve  # Using NPM
yarn serve     # Using Yarn
pnpm serve     # Using PNPM
```

Details of the architecture and API routes can be found in [the server folder](./server/README.md).

Then, serve the client located in the `/client` directory :

```bash
cd /client

npm run dev
yarn dev
pnpm dev
```

## Run the tests

Tests are made using Jest for the API side. Before all, make sure to run the development server (see section above).

Run all the unit and coverage tests :

```bash
npm run test  # Using NPM
yarn test     # Using Yarn
pnpm test     # Using PNPM
```

## Build & deploy for production

Build the static files for the client :

```bash
cd /client

npm run build
yarn build
pnpm build
```

And deploy the API on a server that supports Node.js. You'll use the same command as in the development, i.e. `npm run serve`.

## License

DO WHATEVER YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004
 
Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.
 
           DO WHATEVER YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHATEVER YOU WANT TO.
