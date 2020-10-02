import * as mysql from 'mysql';

import config from '../config';

import AccessTokens from './queries/accesstokens';
import Books from './queries/books';
import Users from './queries/users';

export const Connection = mysql.createPool(config.mysql);

Connection.getConnection((err, connection) => {
    if(err) return connection.end();
});

export default {
    AccessTokens,
    Books,
    Users
};