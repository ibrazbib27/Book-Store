import * as express from 'express';
import * as passport from 'passport';
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.use('/',
    passport.authenticate('local'),
    async (req: any, res, next) => {
        try{
            const token: any = await CreateToken({userid: req.user.id});

            res.json({
                token,
                role: req.user.role,
                userid: req.user.id
            });
        }
        catch (e) {
            res.sendStatus(500);
            throw e;
        }
    })

export default router;