import React from 'react'
import { Button, Container, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import countryCodes from './countryCodes'
import { hasFlag, countries } from 'country-flag-icons'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom';
interface LoginPageProps {

}

export default function LoginPage(loginPageProps: LoginPageProps) {

    const formik = useFormik({
        initialValues:{phoneNumber:'',countryCode:''},
        onSubmit:(values)=>{
            console.log(values)
        }
    })
    return (<>
        <Container>
            <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', alignItems: 'center' }}>
                <img width='200px' height='200px' src={'logo.svg'}/>
                <Button>Sign in with phone number</Button>
                <Link to='/login/phone'>New here create an account</Link>
            </div>

        </Container>
    </>)
}