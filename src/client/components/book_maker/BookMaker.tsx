import * as React from "react";
import Card from "react-bootstrap/Card";
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Link, RouteComponentProps } from "react-router-dom";
import {json} from "../../utils/api";
import { bookType } from "../../App";

interface BookMakerProps extends RouteComponentProps <any> {
    book: bookType;
}

const BookMaker: React.FC<BookMakerProps> = (props) => {
return(
    <Card key={props.book.id} className={'width bg-primary border border-dark rounded shadow text-white mx-auto'}>
    <Card.Img variant="top" src='http://www.pngmart.com/files/1/Civil-Engineering-Book-PNG.png' />
    <Card.Body className={'my-1 text-center'}>
        <Card.Title className={'text-monospace mb-1'}>{props.book.title}</Card.Title>
        <Card.Text className={'mb-1 small'}><em>By: {props.book.author}</em></Card.Text>
        <Badge pill variant="dark" className={'mb-1 shadow-sm'}>{props.book.name}</Badge>
        <Card.Text className={'small'}><b>${props.book.price}</b></Card.Text>
    </Card.Body>
    <Card.Footer className={`d-flex ${props.match.params.id ? 'justify-content-between' : 'justify-content-center'}` }>
        {props.match.params.id ?
            <>
                <Button variant={'danger'} className={'shadow-sm'} onClick={async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                    try{
                        const result: any = await json(`/api/books/${props.book.id}/book`, 'DELETE');
                        if(result)
                            props.history.replace('/books');
                    }
                    catch (e) {
                        throw e;
                    }
                }
                }>Delete Books</Button>
                <Link className={'shadow-sm btn btn-secondary'} to={`/books/$props.book.id}/update`}>
                    Update Book
                </Link>
            </>
            :
            <>
                <Link className={'shadow-sm btn btn-success'} to={`/books/${props.book.id}`}>
                    View Book
                </Link>
            </>

        }
    </Card.Footer>
</Card>
)
};

export default BookMaker;