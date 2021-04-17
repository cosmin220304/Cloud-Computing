import { useState, useContext } from 'react'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { useFormik } from 'formik'
import { AuthContext } from '../../utils/AuthContext'

interface IProps {
  setIsNewUser: Function
}

export default function TellUsMore({setIsNewUser}: IProps) {
  const [selectedGender, setSelectedGender] = useState<string>()
  const [user, setUser] = useContext(AuthContext) 

  const handleClick = (evt: any) => {
    const newSelectedGender = evt.currentTarget.textContent
    const previousTarget: any = document.getElementsByClassName('list-element-selected')[0]
    const target: any = document.getElementById(newSelectedGender)
    
    if (previousTarget) {
      previousTarget.className = 'list-element'
    }
    
    target.className = 'list-element-selected'
    setSelectedGender(newSelectedGender)
  }

  const formik = useFormik({
    initialValues: { name: '', surname: '' },
    onSubmit: (values) => {
      //todo: validation
      setUser( (prev:any) => ({
        phoneNumber: prev.phoneNumber,
        uid: prev.uid,
        name: values.name,
        surname: values.surname,
        gender: selectedGender,
      }))
      setIsNewUser(false)
    },
  })

  return (
    <Container className='m-t-5'>
      <Typography className='center-text' variant='h5'>
        Tell us about you..
      </Typography>

      <form
        onSubmit={formik.handleSubmit}
        className='flex-column center-children'
      >

        <div className='m-t-2 w-20'>
          <TextField
            name='name'
            label='name'
            variant='outlined'
            onChange={formik.handleChange}
            className='w-100p'
          />
        </div>

        <div className='m-t-1 w-20'>
          <TextField
            name='surname'
            label='surname'
            variant='outlined'
            onChange={formik.handleChange}
            className='w-100p'
          />
        </div>

        <div className='flex gap-1 m-t-2' id='category'>
          <div className='list-element' id='Man' onClick={handleClick}>
            <Typography align='center'>Man</Typography>
          </div>
          <div className='list-element' id='Woman' onClick={handleClick}>
            <Typography align='center'>Woman</Typography>
          </div>
          <div className='list-element' id='Other' onClick={handleClick}>
            <Typography align='center'>Other</Typography>
          </div>
        </div>

        <br />

        <Button type='submit'>Next</Button>

      </form>
    </Container>
  )
}
