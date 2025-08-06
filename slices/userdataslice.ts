import { createSlice } from '@reduxjs/toolkit';
import type User from './interfaces/user';

const getInitialState = (): User[] => {
    if (typeof window !== 'undefined' && localStorage.getItem('userdata')) {
      return JSON.parse(localStorage.getItem('userdata') as string);
    }
  
    return [
        {
                id: '1',
            username: 'test',
            password: 'testpass'
        },
        {
            id: '2',
            username: 'andrei',
            password: '123'
        }

    ];
  };

export const userdataSlice = createSlice(
    {
        name: 'userdata',
        initialState: getInitialState(),
        reducers:{
            
        }
    }
);

export const {} = userdataSlice.actions;

export default userdataSlice.reducer;