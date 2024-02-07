import {useState, useEffect} from 'react'
import Button from './components/Button'
import './styles/login.css'
import './styles/button.css'
import Form from './components/Form'


function App(){

    const [typeForm, setTypeForm] = useState("login") //I have a state to control type form to show


    //Here we have input´s attributes represented as object, each i make a form, it should own a array of objects
    const fieldsetsFormSignin = [
        {
            id: "email",
            name: "email",
            type:"text",
            htmlfor: "email",
            txt: "Email"
        },
        {
            id: "password",
            name: "password",
            type: "password",
            htmlfor: "password",
            txt: "Password"
        }
    ]

    const fieldsetsFormSignup = [
        {
            id: "user",
            name: "user",
            type:"text",
            htmlfor: "user",
            txt: "Type your user"
        },
        {
            id: "email",
            name: "email",
            type: "text",
            htmlfor: "email",
            txt: "Type your email"
        },
        {
            id: "password",
            name: "password",
            type: "password",
            htmlfor: "password",
            txt: "New password"
        },
        {
            id: "confirm",
            name: "confirm",
            type: "password",
            htmlfor: "confirm",
            txt: "Confirm your password"
        }
    ]


    //Functions to change to especify form
    const setLoginForm = () => {
        setTypeForm("login")
    }
    const setSignupForm = () => {
        setTypeForm('signup')
    }



    return (
        <main>
            
            <nav className='buttons-login'> 
                {
                    typeForm === "login" 
                    ?
                        <>
                            <p>You don´t have an account?</p>
                            <Button txt='Sign Up' fn={setSignupForm} />
                        </> 
                    : 
                        <>
                            <p>You already have an account?</p>
                            <Button txt='Login' fn={setLoginForm} />
                        </>
                }
            </nav>
            <div className="form-container">
                
                {
                    typeForm === "login" 
                    ?
                        <>
                            <h1>Login</h1>
                            <Form action="#" method="#" fieldsets={fieldsetsFormSignin} txtButtonSubmit="Enter"/>
                        </>
                    :
                        <>
                            <h1>Signup</h1>
                            <Form action="#" method="#" fieldsets={fieldsetsFormSignup} txtButtonSubmit="Sign Up"/>
                        </>
                }
            </div>
        </main>
    )
}

export default App;