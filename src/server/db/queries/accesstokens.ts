import {Connection} from "../index"

import development from '../../config';

const findOne = async (id: number, token: string) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(`SELECT * FROM ${development.mysql.database}.Tokens WHERE id = ? AND token = ? `,
            [id, token],
            (err, results) => {
            if(err) return reject(err);

            resolve(results);

            });
    });
}
const update = async (id: number, token: string) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query( `UPDATE ${development.mysql.database}.Tokens SET token = ? WHERE id = ?;`,
            [token, id],
            (err, results) => {
                if(err) return reject(err);

                resolve(results);

            });
    });
}

const insert = async (id: number) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query( `INSERT INTO ${development.mysql.database}.Tokens (userid) VALUES (?)`,
            [id],
            (err, results) => {
                if(err) return reject(err);

                resolve(results);

            });
    });
}
const last = async () => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query( `SELECT id FROM ${development.mysql.database}.Tokens ORDER BY id DESC LIMIT 1;`,
            (err, results) => {
                if(err) return reject(err);

                resolve(results);

            });
    });
}





export default {
    FindOne: findOne,
    Update: update,
    Insert: insert,
    Last: last
};