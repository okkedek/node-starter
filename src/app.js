import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';

import api from "./config/api"

const app = express();
const port = process.env.PORT || die('PORT not set in ENV');
const host = process.env.HOST || '0.0.0.0';

app.use(logger('combined'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('json spaces', 2);
app.use(`/${api.VERSION}/`, indexRouter);

app.use(function (req, res, next) {
    res.status(404).send({error: 'Not found'})
});

app.use(function (err, req, res, next) {
    console.error(err)
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send({error: err.stack})
});

app.listen(port, host, () => {
    console.log(`node environment: ${process.env.NODE_ENV}`);
    console.log(`Running on port ${host}:${port}`);
});

function die(msg) {
    console.error(msg);
    process.exit(-1)
}
