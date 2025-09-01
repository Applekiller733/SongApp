import { configureStore } from "@reduxjs/toolkit";
import userdataReducer from './slices/userdataslice';
import songdataReducer from './slices/songdataslice';
// import currentuserReducer from './slices/currentuserslice';

const store = configureStore({
    reducer: {
        userdata: userdataReducer,
        songdata: songdataReducer,
    },
}
);

// if (typeof window !== undefined) {
//     userstore.subscribe(() => {
//         localStorage.setItem('token', JSON.stringify(userstore.getState().currentuser.token)),
//             localStorage.setItem('currentuser', JSON.stringify(userstore.getState().currentuser.user))
//     })
// }

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;