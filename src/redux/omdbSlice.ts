import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';

export interface movie {
    imdbID: string,
    title: string,
    plot: string,
    actors: string,
    imdbRating: string,
    poster: string
}

export interface omdbState {
  search: string;
  movie: movie | null,
  favorites: string[],
  status: 'idle' | 'loading' | 'failed';
}

const initialState: omdbState = {
  search: '',
  movie: null,
  favorites: [],
  status: 'idle',
};

const apiKey = '5332099a';

export const searchMovie = createAsyncThunk(
    'omdb/searchMovie',
    async (search: string) => {
        const result = await fetch(`http://www.omdbapi.com/?t=${search}&apikey=${apiKey}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error();
            }
            return response.json()}
            )
        .then(data=> {
            if (data.Response === 'False') {
                throw new Error();
            }
            return { 
                imdbID: data.imdbID,
                title: data.Title,
                plot: data.Plot,
                actors: data.Actors,
                imdbRating: data.imdbRating,
                poster: data.Poster
            }});

            return result;
        }
);

// export const getPoster = (imdbID: string | undefined) => {
//     if (imdbID) {
//         return `http://img.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
//     } else {
//         return '';
//     }
// }

export const getRating = (imdbRating: string | undefined) => {
    if (imdbRating) {
        return parseFloat(imdbRating)* .5;
    } else {
        return 0;
    }
}



export const omdbSlice = createSlice({
  name: 'omdb',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
        state.favorites = state.favorites.filter(item=>item !== action.payload);
    },
      resetSearch: (state) => {
        state.movie = null;
    },
},
  extraReducers: (builder) => {
    builder
      .addCase(searchMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMovie.fulfilled, (state, action) => {
        state.status = 'idle';
        state.movie = { ...action.payload };
      })
      .addCase(searchMovie.rejected, (state) => {
        state.status = 'failed';
        state.movie = null;
      });
  },
});

export const { addFavorite, removeFavorite, resetSearch } = omdbSlice.actions;

export const currentMovie = (state: RootState) => state.omdb.movie;
export const favoriteList = (state: RootState) => state.omdb.favorites;
export const searchStatus = (state: RootState) => state.omdb.status;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(favorite(amount));
//     }
//   };

export default omdbSlice.reducer;
