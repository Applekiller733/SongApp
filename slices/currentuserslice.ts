import { createSlice } from '@reduxjs/toolkit';
import type User from './interfaces/user';

interface currentuserState  {
    user: User,
    token: string
}

const getInitialState = (): currentuserState => {
    if (typeof window !== 'undefined' && localStorage.getItem('currentuser')) {
      return JSON.parse(localStorage.getItem('currentuser') as string);
    }
  
    return (
        {       
            user:{ 
                id: '1',
                username: 'test',
                password: 'testpass',
               },
            token: ''
        }
    )
  };

export const currentuserSlice = createSlice(
    {
        name: 'currentuser',
        initialState: getInitialState(),
        reducers:{
            updateUser: (state, action) => {
                state.user = action.payload;
            },
            updateToken: (state, action) => {
                state.token = action.payload;
            },
        }
    }
);

export const {updateUser, updateToken} = currentuserSlice.actions;

export default currentuserSlice.reducer;