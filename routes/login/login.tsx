import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "~/stores/userstore";
import { updateUser, updateToken } from "~/slices/currentuserslice";
import './login.css';


export default function Login(){
    const users = useSelector((state: RootState) => state.userdata);
    // console.log(Array.isArray(users));
    const dispatch = useDispatch();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        let form = e.currentTarget;
        let username = (form.elements.namedItem('username') as HTMLInputElement).value as string;
        let password = (form.elements.namedItem('password') as HTMLInputElement).value as string;
        if (checkUsername(username) && checkPassword(password)){
            console.log('logged in');
            dispatch(updateUser({
                id:'4',
                username: username,
                password: password,
            }));
            dispatch(updateToken('FAJFAHFJAJFJJHFHAJFHAJFHA'))
        }
        else 
        {
            console.log(`login failed`);
        }
    }

    function checkUsername(username:string){
        if ( users.find(u => u.username === username) !== undefined){
            return true;
        }
        return false;
    }

    function checkPassword(password:string){
        if ( users.find(u => u.password === password) !== undefined){
            return true;
        }
        return false;
    }

    return (

        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label htmlFor="username">Username:</label>
                <input id="username" name="username" type="text" />

                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}