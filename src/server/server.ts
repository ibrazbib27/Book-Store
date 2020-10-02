import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import * as passport from 'passport';

import './middleware/bearerstrategy';
import './middleware/localstrategy';

import router from './routes/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(express.static('public'));
app.use(router);

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
