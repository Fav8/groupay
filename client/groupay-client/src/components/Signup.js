import React, { useRef, useState } from 'react'
import { Container, Form, Button, Card} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiServices from '../services/apiService'

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup, token} = useAuth()
    const [loading, setLoading] = useState()
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault();
        if(passwordConfirmRef.current.value !== passwordRef.current.value){
            console.log('password dont match'); return
        }
        try{
            setLoading(true)
            const user = await signup(emailRef.current.value, passwordRef.current.value)
            console.log(token, 'token');
            console.log(user, 'user');
            await apiServices.register(token, user.user.uid)
            navigate('/')
            }
        catch(err){
            console.log(err)
        }
        setLoading(false)
    }
  return (
    <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'}}>
    <div>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' required ref={emailRef}></Form.Control>
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>password</Form.Label>
                        <Form.Control type='password' required ref={passwordRef}></Form.Control>
                    </Form.Group>
                    <Form.Group id='email'>
                        <Form.Label>password confirmation</Form.Label>
                        <Form.Control type='password' required ref={passwordConfirmRef}></Form.Control>
                    </Form.Group>
                    <Button disabled={loading} className='w-100 text-center mt-2' type='submit' >Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already have an account?  <Link to="/login">Log in</Link>
        </div>


    </div>
    </Container>
  )
}
