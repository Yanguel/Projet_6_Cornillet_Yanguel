// importe le package de "node" pour écouter les requetes HTTP
const http = require("http");

// Création d'un serveur
const server = http.createServer((req, res) => {
  res.end("La réponse du serveur !");
});

server.listen(3000);
