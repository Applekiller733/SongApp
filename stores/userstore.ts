import { configureStore } from "@reduxjs/toolkit";
import userdataReducer from '../slices/userdataslice';
import currentuserReducer from '../slices/currentuserslice';

const userstore = configureStore({
    reducer: {
        userdata: userdataReducer,
        currentuser: currentuserReducer,
    },
}
);

userstore.subscribe(()=>{
    localStorage.setItem('token', JSON.stringify(userstore.getState().currentuser.token))
  })

export default userstore;
export type RootState = ReturnType<typeof userstore.getState>;
export type AppDispatch = typeof userstore.dispatch;