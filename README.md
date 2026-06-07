# Simple Full-Stack TypeScript To-Do Web Application
A lightweight, full-stack task management web application. It features a backend REST API built with **Node.js** and **Express**, paired with a raw **HTML and TypeScript** frontend client.

## Initialize the Project
```bash
npm init -y
```

## Install Dependencies
```bash
npm install express
npm install -D typescript ts-node @types/node @types/express
```

## Compile
```bash
.\node_modules\.bin\tsc src/public/client.ts --target es2022 --module esnext --skipLibCheck --ignoreConfig
```

# Build the Whole Project (Optional)
```bash
.\node_modules\.bin\tsc
```

# Start the Web Server
```bash
-npm start
```