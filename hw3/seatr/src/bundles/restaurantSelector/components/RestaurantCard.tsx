import React from 'react';
import {Container, Paper, Typography} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';

import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

interface RestaurantCardProps{
    priceRange:1|2|3,
    starRating:1|2|3|4|5,
    title:string,
    description?:string|undefined,
    backgroundUrl:string,
    logoUrl:string,
}

export default function RestaurantCard(restaurantCardProps:RestaurantCardProps){
    const nOfMinutes=5;
    const {priceRange, starRating, title, description,logoUrl,backgroundUrl} = restaurantCardProps;
    return (
        <Paper style={{display:'flex',flexDirection:'column', position:'relative'}} elevation={1}>
            <div>
                <div style={{backgroundColor:'red',height:'100px'}}>
                    <img style={{width:'100%', height:'100%'}} src={backgroundUrl}/>
                </div>
                <div style={{position:'absolute', left: '50%', transform:'translate(-50%,-50%)', padding:'1rem'}}>
                    <div style={{margin:'auto',width:'8rem', height:'8rem', display:'flex'}}>
                        <div style={{margin:'auto', maxWidth:'5.5rem', maxHeight:'5.5rem', }}>
                            <img src={logoUrl}  style={{backgroundColor:'white', width:'100%', height:'100%', borderRadius:'50%'}}/>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <div style={{paddingTop:'3.5rem', paddingLeft:'1rem', paddingRight:'1rem', paddingBottom:'1rem'}}>
                    <Typography variant={'h6'} style={{textOverflow:'ellipsis'}}>
                        {title}
                    </Typography>
                    <Typography variant={'body1'} style={{textOverflow:'ellipsis'}}>
                        {description}
                    </Typography>
                </div>
                <Paper style={{display:'flex',flexDirection:'row', justifyContent:'space-between', padding:'1rem'}} elevation={1}>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <DriveEtaIcon/>
                        <Typography>{`${nOfMinutes} min`}</Typography>
                    </div>
                    <Rating icon={<AttachMoneyIcon/>} name="half-rating-read" max={3} defaultValue={priceRange} precision={1} readOnly />
                    <Rating name="half-rating-read" max={5} defaultValue={starRating} precision={0.5} />
                </Paper>
            </div>
        </Paper>
    )
}