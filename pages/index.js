import React from 'react';
import Items from '../components/Items';
import { parse } from 'date-fns';

const Home = props => (
    <div>
        <Items page={parseFloat(props.query.page) || 1}/>
    </div>
)

export default Home;