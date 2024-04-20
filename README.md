# in104

A website project made for ENSTA courses by Arnaud Pelissier, Seydou Sene, Doris Diallo and Théo Vidal.

The goal of this project is to develop an app for teachers to take the register using regenerating QR-codes (to prevent students sharing it).

[Project homepage]((https://bow-chevre-f4f.notion.site/IN104-5080e615e0284753b8b3f09e9233b825?pvs=4) (in french)

## Project setup

First, check that you have all the following dependencies :

- Git
- Node.Js with a package manager (NPM, Yarn, pnpm...)

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
```

Create a `.env` file at the root of the folder (so at the same level as `index.js`) and populate it with the values given in the [example .env](../.env.example).

## Run a development server

Run the server :

```bash
npm run dev  # Using NPM
yarn dev     # Using Yarn
pnpm dev     # Using PNPM
```

## Run the tests

Tests are made using Jest for the API side.

Run all the unit and coverage tests :

```bash
npm run test  # Using NPM
yarn test     # Using Yarn
pnpm test     # Using PNPM
```

## Build & deploy for production

TODO

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
