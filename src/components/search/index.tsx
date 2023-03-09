import React from 'react';
import { Text, FlexBox, Input, Button, Title } from '@ui5/webcomponents-react';
import './styles.scss';
import { useAppDispatch } from '../../redux/hooks';
import { searchMovie, resetSearch } from '../../redux/omdbSlice';

function Search() {
    const dispatch = useAppDispatch();
    const [ search, setSearch ] = React.useState('');
    const resetHandler = () => {
        setSearch('');
        dispatch(resetSearch());
    }
    return (
    <div className='search'>
        <FlexBox alignItems='Center' justifyContent='SpaceBetween' direction='Column' fitContainer className='title'>
            <Title level='H1'>Search Movie</Title>
            <Text>The Open Movie Database (OMDb) is an online database of movie information that is free to use by anyone.
            It offers information on films such as title, year, plot, cast, ratings, and more.
            OMDb is powered by the community, so anyone can add or edit information about films, making it a great source for movie fans.</Text>
        </FlexBox>
        <FlexBox alignItems='Center' justifyContent='SpaceBetween' fitContainer className='search-bar'>
            <Input
            value={search}
            placeholder='movie title'
            onInput={(e)=>setSearch(e.target.value as string)}
            />
            <Button
            onClick={()=>dispatch(searchMovie(search))}
            design='Emphasized'
            >
                Search
            </Button>
            <Button
            onClick={resetHandler}
            design='Emphasized'
            >
                Reset
            </Button>
        </FlexBox>
    </div>
    );
}

export default Search;
