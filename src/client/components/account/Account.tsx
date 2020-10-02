import * as React from "react";
import {useState} from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import { RouteComponentProps } from "react-router-dom";
import {json, SetAccessToken} from "../../utils/api";

interface AccountProps extends RouteComponentProps <any> {
    authType: boolean;
}

const Account: React.FC<AccountProps> = (props) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [formValidations, setFormValidations] = useState<{email: boolean; password: boolean; name: boolean;}>({email: true, password: true, name: !props.authType});
    const [errMessages, setErrMessages] = useState<{email: string; password: string; name: string;}>
    ({email: props.authType ? 'Enter your email' : 'Enter a valid email',  password: props.authType ? 'Enter your password' : 'Enter a valid password that is at least 6 character long', name: 'Enter your full name'});
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try{
        if((!formValidations.email && !formValidations.password && !formValidations.name)||(props.authType && submitted)) await handleAccountSubmission();
        else setSubmitted(true);
        }
        catch (e) {
           throw e;
        }
    }
    const handleAccountSubmission = async () => {
        try{
        const result: any = await json(`/auth/${props.authType ? 'login' : 'register'}`, 'POST',
            props.authType ? {email, password} : {email, password, name} );

        if(result){
            const {token, role, userid}: any = result;
            SetAccessToken(token, {role, userid});
            props.history.replace('/books');
        }
        else{
        setSubmitted(true);
        setFormValidations(prevValidations => ({...prevValidations, email: true, password: true}));
        setErrMessages(prevMessage => ({...prevMessage, email: "Invalid email/password combo", password: "Invalid email/password combo"}));
        }
        }
        catch (e) {
            throw e;
        }
    }
return(
    <Jumbotron fluid className={'text-center rounded shadow bg-light w-100'}>
        <Form noValidate onSubmit={handleSubmit}>
            {!props.authType ?
                <Form.Row className={'justify-content-center my-5'}>
                    <Form.Group as={Col} xs={10}>
                        <Form.Label><b>Full Name</b></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Full Name"
                            isInvalid={submitted ? formValidations.name : false}
                            className={'shadow-sm'}
                        />
                        <Form.Control.Feedback type={'invalid'} className={'text-left'}>{errMessages.name}</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                :
                null
            }
            <Form.Row className={'justify-content-center my-5'}>
                <Form.Group as={Col} xs={10}>
                    <Form.Label><b>Email</b></Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        isInvalid={submitted ? formValidations.email : false}
                        className={'shadow-sm'}
                    />
                    <Form.Control.Feedback type={'invalid'} className={'text-left'}>{errMessages.email}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row className={'justify-content-center my-5'}>
                <Form.Group as={Col} xs={10}>
                    <Form.Label><b>Password</b></Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder={props.authType ? 'Password' : 'At least 6 characters'}
                        isInvalid={submitted ? formValidations.password : false}
                        className={'shadow-sm'}
                    />
                    <Form.Control.Feedback type={'invalid'} className={'text-left'}>{errMessages.password}</Form.Control.Feedback>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} xs={10} className={'justify-content-center'}>
            <Button variant={'success'} className={'shadow-sm'} type="submit">{props.authType ? 'Login' : 'Register'}</Button>
        </Form.Group>
    </Form.Row>
        </Form>
    </Jumbotron>
);
};

export default Account;