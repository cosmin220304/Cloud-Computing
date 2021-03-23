import React from 'react'
import {Button, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import countryCodes from './countryCodes'
import {hasFlag, countries} from 'country-flag-icons'

interface LoginPageProps{

}

export default function LoginPage(loginPageProps:LoginPageProps){

    return(<>
       <Typography>Enter phone number</Typography>
        <Select>
            {
                countryCodes.map(val=>{
                    <MenuItem value={val.name}>
                            {val.dial_code}
                    </MenuItem>
                })
            }
            <MenuItem value={10}>+40</MenuItem>
            <MenuItem value={20}>+3</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <TextField/>
        <Button>Next</Button>
    </>)
}