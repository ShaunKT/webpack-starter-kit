const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 7070;

const ServerRendererPath = path.join(
  __dirname,
  '../',
  '../',
  'dist/',
  'static/',
  'server.js',
);
const ServerRenderer = require(ServerRendererPath).default;

const ClientStatsPath = path.join(
  __dirname,
  '../',
  '../',
  'dist/',
  'stats.json',
);
const Stats = require(ClientStatsPath);

app.use(ServerRenderer(Stats));

app.listen(PORT);
console.log(`Listerning on http://localhost:${PORT}`);
