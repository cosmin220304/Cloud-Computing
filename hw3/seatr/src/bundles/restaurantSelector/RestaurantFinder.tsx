import React, {useState} from 'react'
import {Container, Paper, TextField} from "@material-ui/core";
import {MenuOutlined, SearchOutlined} from "@material-ui/icons";
import RestaurantCard from "./components/RestaurantCard";

interface RestaurantFinderProps{

}

export default function RestaurantFinder(props:RestaurantFinderProps){

    const [searchValue, setSearchValue] = useState('')
    return(
        <>
            <div style={{height:'1rem'}} />
            <Paper>
                <Container style={{padding:'0.5rem',display:'flex', flexDirection:'row', width:'100%', alignItems:'center'}}>
                    <TextField value={searchValue} fullWidth/>
                    <SearchOutlined/>
                    <MenuOutlined/>
                </Container>
            </Paper>
            <div style={{height:'1rem'}} />
            <RestaurantCard
                backgroundUrl='https://static.takeaway.com/images/generic/heroes/41/41_chinese_43.jpg?timestamp=1610955949'
                logoUrl='https://static.takeaway.com/images/restaurants/ro/ONRORQR/logo_465x320.png?timestamp=1610272382'
                starRating={4}
                priceRange={2}
                title={'La cao'}
                description={'great chinese restaurant'}/>
        </>)
}