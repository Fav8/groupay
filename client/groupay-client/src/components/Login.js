import React, { useRef, useState } from 'react'
import { Container,Form, Button, Card} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth()
    const [loading, setLoading] = useState()
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setLoading(true)
            const user = await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        }
        catch(err){
            console.log('failed to log in')
        }
        setLoading(false)
    }
  return (
    <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'}}>
    <div>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' required ref={emailRef}></Form.Control>
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>password</Form.Label>
                        <Form.Control type='password' required ref={passwordRef}></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} className='w-100 text-center mt-2' type='submit' >Log In</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Dont have an account? <Link to="/signup">Sign Up</Link>
        </div>
    </div>
    </Container>
  )
}
