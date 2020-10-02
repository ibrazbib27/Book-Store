import {Connection} from "../index"

import development from '../../config';


const findOneByEmail = async (email: string) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query( `SELECT * FROM ${development.mysql.database}.Users WHERE email = ? LIMIT 1;`,
            [email],
            (err, results) => {
                if(err) return reject(err);

                resolve(results);

            });
    });
}

const findOneById = async (id: number) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query( `SELECT * FROM ${development.mysql.database}.Users WHERE id = ? LIMIT 1;`,
            [id],
            (err, results) => {
                if(err) return reject(err);

                resolve(results);

            });
    });
}

const insert = async (user: any) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(  `INSERT INTO ${development.mysql.database}.Users ` +
            "(`email`, `password`, `name`) VALUE (?, ?, ?);",
            [user.email, user.password, user.name],
            (err, results) => {
                if(err) return reject(err);

                resolve(results);

            });
    });
}



export default {
    FindOneByEmail: findOneByEmail,
    FindOneById: findOneById,
    Insert: insert
};