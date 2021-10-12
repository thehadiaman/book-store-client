import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TopNavBar from "./components/topNavBar";
import BookCard from "./components/common/bookCard";
import './App.css';

export default function ResponsiveGrid() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <TopNavBar/>
            <Container>
                <Grid container spacing={{ xs: 2, md: 3, lg: 3}} columns={{ xs: 12, sm: 12, md: 12, lg:12 }}>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                    <BookCard/>
                </Grid>
            </Container>
        </Box>
    );
}
