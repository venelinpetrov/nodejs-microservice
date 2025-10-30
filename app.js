// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from 'express';
import {pinoHttp, logger} from './utils/logging.js';


const VERSION_INFO = {
  version: process.env.BUILD_VERSION || 'unknown',
  commit: process.env.BUILD_COMMIT || 'unknown',
  built_at: process.env.BUILD_TIME || new Date().toISOString()
};

const app = express();

// Use request-based logger for log correlation
app.use(pinoHttp);

// Example endpoint
app.get('/', async (req, res) => {
  // Use basic logger without HTTP request info
  logger.info({logField: 'custom-entry', arbitraryField: 'custom-entry'}); // Example of structured logging
  // Use request-based logger with log correlation
  req.log.info('Child logger with trace Id.'); // https://cloud.google.com/run/docs/logging#correlate-logs
  res.send('Hi from staging!');
});

app.get('/version', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(VERSION_INFO, null, 2));
});

export default app;
