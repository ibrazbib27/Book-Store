import * as React from "react";
import { useEffect, useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import NumberFormat from 'react-number-format';
import { RouteComponentProps } from "react-router-dom";
import {json} from "../../utils/api";
import { bookType } from "../../App";

interface BookDetailsProps extends RouteComponentProps <any> {
}

const BookDetails: React.FC<BookDetailsProps> = (props) => {
    const [book, setBook] = useState<bookType>({id: 0, title: '', author: '', price:0.00, name: '', categoryid: 0});
    const [categories, setCategories] = useState<{id: number; name: string;} []>([]);
    const [formValidations, setFormValidations] = useState<{author: boolean; category: boolean; price: boolean; title: boolean;}>({author: !props.match.params.id , category: !props.match.params.id,  price: false, title: !props.match.params.id});
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            try{
                const categoriesDetails: any = await json(`/api/books/categories`, 'GET');
                setCategories([...categoriesDetails]);
                if(props.match.params.id)
                {
                    const bookDetails: any = await json(`/api/books/${props.match.params.id}/book`, 'GET');
                    setBook({...bookDetails[0]});
                }
                setLoaded(true);
            }
            catch (e) {
                throw e;
            }
        })();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try{
            if((!formValidations.author && !formValidations.category && !formValidations.price && !formValidations.title)) await handleBookSubmission();
            else setSubmitted(true);
        }
        catch (e) {
            throw e;
        }
    }
    const handleBookSubmission = async () => {
        try{


            const result: any = await json(`/api/books/${props.match.params.id ? `${book.id}/book` : 'post'}`,
                `${props.match.params.id ? `PUT` : 'POST'}`, book);

            if(result){
                props.history.replace(props.match.params.id ? `/books/${props.match.params.id}` : '/books');
            }
            else{
                setSubmitted(true);
            }
        }
        catch (e) {
            throw e;
        }
    }
    return(
        <Jumbotron fluid className={'text-center rounded shadow bg-light w-100'}>
            <Form noValidate onSubmit={handleSubmit}>
                {loaded ?
                    <>
                    <Form.Row key={'title'} className={'justify-content-center my-5'}>
                        <Form.Group key={'title'} as={Col} xs={10}>
                            <Form.Label><b>Title</b></Form.Label>
                            <Form.Control
                                type="text"
                                key={'title'}
                                defaultValue={book.title}
                                placeholder="Title"
                                isInvalid={submitted ? formValidations.title : false}
                                className={'shadow-sm'}
                                maxLength={60}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    e.persist();
                                    setBook(prevInfo => ({...prevInfo, title: e.target.value.trim()}))
                                    setFormValidations(prevValidations => ({...prevValidations, title: e.target.value.trim().length === 0}));

                                }}
                            />
                            <Form.Control.Feedback type={'invalid'} className={'text-left'}>Enter book title</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                <Form.Row className={'justify-content-center my-5'}>
                    <Form.Group as={Col} xs={10}>
                        <Form.Label><b>Author</b></Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={book.author}
                            placeholder="Author"
                            isInvalid={submitted ? formValidations.author : false}
                            className={'shadow-sm'}
                            maxLength={60}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                e.persist();
                                setBook(prevInfo => ({...prevInfo, author: e.target.value.trim()}))
                                setFormValidations(prevValidations => ({...prevValidations, author: e.target.value.trim().length === 0}));

                            }}
                        />
                        <Form.Control.Feedback type={'invalid'} className={'text-left'}>Enter book title</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row className={'justify-content-center'}>
                    <Form.Group as={Col} xs={10}>
                        <Form.Row className={'m-0 p-0 justify-content-between my-5'}>
                            <Form.Group key={'price'} as={Col} xs={12} md={4}>
                        <Form.Label><b>Price</b></Form.Label>
               <NumberFormat
                   prefix={'$'}
                   defaultValue={book.price}
                   className={`shadow-sm form-control ${submitted ? (formValidations.price ? 'is-invalid' : '') : '' }`}
                   thousandSeparator={true}
                   allowNegative={false}
                   decimalScale={2}
                   fixedDecimalScale={true}
                   onValueChange={(values) => {
                       const validation: boolean = isNaN(parseFloat(values.value));
                       const value: number = validation ? 0.00 : parseFloat(values.value);
                       setBook(prevInfo => ({...prevInfo, price: value}))
                       setFormValidations(prevValidations => ({...prevValidations, price: validation}));

                   }}
               />
                        <Form.Control.Feedback type={'invalid'} className={'text-left'}>Enter valid price value</Form.Control.Feedback>
                    </Form.Group>
                            <Form.Group key={'category'}  as={Col} xs={12} md={7}>
                                <Form.Label><b>Category</b></Form.Label>
                                <Form.Control
                                    as={'select'}
                                    defaultValue={book.categoryid}
                                    isInvalid={submitted ? formValidations.category : false}
                                    className={'shadow-sm'}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        e.persist();
                                        setBook(prevInfo => ({...prevInfo, categoryid: parseInt(e.target.value)}))
                                        setFormValidations(prevValidations => ({...prevValidations, category: parseInt(e.target.value) === 0}));
                                    }}
                                >
                                <option key={0} value={0} disabled>Select A Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id} >{category.name}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type={'invalid'} className={'text-left'}>Select A Category</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                    </Form.Group>
                </Form.Row>
                <Form.Row className={'justify-content-center'}>
                    <Form.Group as={Col} xs={10}>
                        <Button variant={'success'} className={'shadow-sm'} type="submit">{props.match.params.id ? 'Save Changes' : 'Create New Book'}</Button>
                    </Form.Group>
                </Form.Row>
                    </>
                    :
                    null
                }
            </Form>
        </Jumbotron>
    );
};

export default BookDetails;