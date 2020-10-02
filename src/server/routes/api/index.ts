import * as express from 'express';
import * as passport from 'passport';

import booksRoute from './books';

const router = express.Router();

router.use((req: any, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user;

        return next();

    })(req, res, next);
});

router.use('/books', booksRoute);

export default router;