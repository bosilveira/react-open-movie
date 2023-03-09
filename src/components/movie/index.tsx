import React from 'react';
import { Text, Title, FlexBox, RatingIndicator, BusyIndicator, ToggleButton, Loader  } from '@ui5/webcomponents-react';
import './styles.scss';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { currentMovie, favoriteList, searchMovie, addFavorite, removeFavorite, getRating, searchStatus, resetSearch } from '../../redux/omdbSlice';
import "@ui5/webcomponents-icons/dist/heart-2.js";
import "@ui5/webcomponents-icons/dist/heart.js";

function Movie() {
    const movie = useAppSelector(currentMovie);
    const favorites = useAppSelector(favoriteList);
    const status = useAppSelector(searchStatus);

    const dispatch = useAppDispatch();
    const favoriteHandler = () => {
        if (favorites.includes(movie?.imdbID as string)) {
            dispatch(removeFavorite(movie?.imdbID));
        } else {
            dispatch(addFavorite(movie?.imdbID));
        }
    }

    const imgErrorHandler = ({ currentTarget }: React.SyntheticEvent<HTMLImageElement, Event>) =>{
        currentTarget.onerror=null;
        currentTarget.src='not-found.png'
    }

  return (
    <div className='movie'>
        { status == 'failed' && <Text>Movie not found. Try again.</Text>}
        { status == 'idle' && !movie && <Text>Type a movie title.</Text>}

        { status == 'loading' && <Loader  type='Indeterminate' /> }
        { status !== 'loading' && movie && <>
        <FlexBox alignItems='Start' justifyContent='Start' direction='Column' fitContainer className='movie-info'>
            <Title level='H2'>{movie?.title}</Title>
            <Text>{movie?.plot}</Text>
            <Text>Actor(s): {movie?.actors}</Text>
            <RatingIndicator value={getRating(movie?.imdbRating)} readonly/>
            <ToggleButton
            icon={favorites.includes(movie?.imdbID as string) ? 'heart' : 'heart-2'}
            iconEnd
            onClick={favoriteHandler}
            pressed={favorites.includes(movie?.imdbID as string)}
            >
                Favorite
            </ToggleButton>
        </FlexBox>
        
        <picture>
            <img src={movie?.poster} onError={imgErrorHandler}/>
        </picture> 
        </>}
    </div>
  );
}

export default Movie;
