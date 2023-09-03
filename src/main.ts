import express from 'express';
import cors from 'cors';

import { router } from './routes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

const app = express();

app.use(cors());
app.use(express.json({limit: '255mb'}));

app.use(router);

app.get('/health', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
