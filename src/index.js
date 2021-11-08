import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import httpStatus from 'http-status';
import config from './common/config.js';
import { errorHandler } from './common/middlewares/error-handler.js';
import { router } from './router.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use('/api', router);

app.use(express.static('public'));

app.use('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

app.use(errorHandler);

app.listen(config.PORT, err => {
  if (err != null) {
    console.error(err); // eslint-disable-line no-console
  } else {
    console.log(`Listening on port ${config.PORT}`); // eslint-disable-line no-console
  }
});
