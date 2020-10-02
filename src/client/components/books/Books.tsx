import * as React from "react";
import {useEffect, useState} from "react";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import { RouteComponentProps } from "react-router-dom";
import {json} from "../../utils/api";
import BookMaker from "../book_maker/BookMaker";
import { bookType } from "../../App";

interface BooksProps extends RouteComponentProps <any> {}

const Books: React.FC<BooksProps> = (props) => {
    const [books, setBooks] = useState<bookType []>([]);

    useEffect(() => {
        (async () => {
            try{
                console.log(`/api/books/${props.match.params.id ? `${props.match.params.id }/book` : 'all'}`)
                const bookArr: any = await json(`/api/books/${props.match.params.id ? `${props.match.params.id }/book` : 'all'}`, 'GET');
                setBooks([...bookArr]);
            }
            catch (e) {
                throw e;
            }
        })();
    }, []);


    return(
        <Row xs={1} sm={1} md={2} lg={3} xl={3} className={`w-100 justify-content-center align-items-${books.length > 1 ? 'stretch' : 'center'}`}>
            {books.map((book) => (
                <Col key={book.id} className={`py-3 my-3 ${books.length > 1 ? 'd-flex align-self-stretch': ' px-3 px-md-0'}`}>
                <BookMaker key={book.id} book={book} history={props.history} location={props.location} match={props.match} />
                </Col>
                )
            )}

        </Row>
    );
};

export default Books;