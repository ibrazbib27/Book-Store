import {Connection} from "../index"

import development from '../../config';

const getAllBooks = async () => {
    return new Promise<any>((resolve, reject) => {
        Connection.query( `SELECT b.id, b.title, b.author, b.price, c.name FROM ${development.mysql.database}.Books b ` +
            `JOIN ${development.mysql.database}.Categories c ON b.categoryid = c.id;`  ,
            (err, results) => {
                if(err) return reject(err);

                resolve(results);

            });
    });
}

const getAllCategories = async () => {
    return new Promise<any>((resolve, reject) => {
        Connection.query( `SELECT id, name FROM ${development.mysql.database}.Categories;`  ,
            (err, results) => {
                if(err) return reject(err);

                resolve(results);

            });
    });
}

const getBooks = async (id: number) => {
    return new Promise<any>((resolve, reject) => {
        Connection.query( `SELECT b.id, b.title, b.author, b.price, c.name, b.categoryid FROM ${development.mysql.database}.Books b ` +
            `JOIN ${development.mysql.database}.Categories c ON b.categoryid = c.id WHERE b.id = ?`   , [id],
            (err, results) => {
                if(err) return reject(err);

                resolve(results);

            });
    });
}

const deleteBook = async (id: number) => {
    return new Promise<any>((resolve, reject) => {
        Connection.query( `DELETE FROM ${development.mysql.database}.Books WHERE id = ?`   , [id],
            (err, results) => {
                if(err) return reject(err);

                resolve(results);

            });
    });
}

const createBook = async (book: any) => {
    return new Promise<any>((resolve, reject) => {
        Connection.query( `INSERT INTO ${development.mysql.database}.Books (author, categoryid, price, title) ` +
            `VALUES (?, ?, ?, ?)`	  , [book.author, book.categoryid, book.price, book.title],
            (err, results) => {
                if(err) return reject(err);

                resolve(results);

            });
    });
}

const updateBook = async (book: any) => {
    return new Promise<any>((resolve, reject) => {
        Connection.query( `UPDATE ${development.mysql.database}.Books ` +
            "SET `author` = ?, `categoryid` = ?, `price` = ?, `title` = ? WHERE `id` = ?;"	  ,
            [book.author, book.categoryid, book.price, book.title, book.id],
            (err, results) => {
                if(err) return reject(err);

                resolve(results);

            });
    });
}



export default {
    GetAllBooks:getAllBooks,
    GetAllCategories:getAllCategories,
    GetBook: getBooks,
    DeleteBook: deleteBook,
    CreateBook: createBook,
    UpdateBook: updateBook
};