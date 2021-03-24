import React from 'react'
import { Button, Container, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import countryCodes from './countryCodes'
import { hasFlag, countries } from 'country-flag-icons'
import { useFormik } from 'formik'

export default function LoginWithPhonePage() {

    const formik = useFormik({
        initialValues:{phoneNumber:'',countryCode:''},
        onSubmit:(values)=>{
            console.log(values)
        }
    })
    return (<>
        <Container>
            <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto', alignItems: 'center' }}>
                <Typography>Enter phone number</Typography>
                <div style={{ display: 'flex', flexDirection: 'row', margin: 'auto' }}>
                    <form onSubmit={formik.handleSubmit} style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <Select value={formik.values.countryCode} onChange={formik.handleChange} name='countryCode' >
                                {
                                    countryCodes.map((val,idx) =>
                                        <MenuItem key={idx} value={val.code}>
                                            {`${val.code} ${val.dial_code}`}
                                        </MenuItem>
                            )
                                }
                            </Select>
                            <TextField value={formik.values.phoneNumber} onChange={formik.handleChange} name='phoneNumber' type='tel' />
                        </div>
                        <Button type='submit'>Next</Button>
                    </form>
                </div>
            </div>

        </Container>
    </>)
}