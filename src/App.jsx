import {useState, useEffect, useContext} from 'react'
import Button from './components/Button'
import './styles/login.css'
import './styles/button.css'
import './styles/modal-primary.css'
import Form from './components/Form'
import Modal from './components/Modal'



function App(){

    //My status
    const [typeForm, setTypeForm] = useState("login") //I have a state to control type form to show
    const [valoresSignin, setValoresSignin] = useState({
        email: '',
        password: '',
    });
    const [valoresSignup, setValoresSignup] = useState({
        user: '',
        email: '',
        password: '',
        confirm: ''
    });
    const [modal,setModal] = useState(false);
    const [message,setMessage] = useState("");
    const [title, setTitle] = useState("");

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


    //Functions abou what to do after clic button 'submit' in form - que hacer despues de que se envie el formulario?
    //Formulario Signin
    const handleSubmitSignin = e => {
        e.preventDefault();
        const {email,password} = valoresSignin;
        if(!(email && password)){//Si ambos inputs no estan completos
            setModal(true)
            setTitle("Incomplete Fields")
            setMessage("Fill all fields")
        } 
    }

    const handleChangeSignin = e => {//Cuando se este escribiendo en un input
        const { name, value } = e.target;//Actaulizar el estado de los valores 
        setValoresSignin({
            ...valoresSignin,
            [name]: value
        });
    }
    //Formulario Signup
    const handleSubmitSignup = e => {
        e.preventDefault();
        const {user,email,password,confirm} = valoresSignup;
        if(!(email && password && user && confirm)){//Si ambos inputs no estan completos
            setModal(true)
            setTitle("Incomplete Fields")
            setMessage("Fill all fields")
        } else{
            if(password !== confirm){
                setModal(true)
                setTitle("Not Match")
                setMessage("Your passwords don´t match")
            }
        }
    }

    const handleChangeSignup = e => {//Cuando se este escribiendo en un input
        const { name, value } = e.target;//Actaulizar el estado de los valores 
        setValoresSignup({
            ...valoresSignup,
            [name]: value
        });
    }

    
    //Una vez aparezca el moda, eliminarlo pasado los x segundos
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setModal(false)
        },3000)
        return () => clearTimeout(timer)
    },[modal])


    return (
        <main>

            
                {

                    modal 
                    ? 
                        <><div className="modal-container-login"><Modal title={title} message={message}/></div></>
                    :
                        <></>

                }
                

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
                            <Form action="#" method="#" fieldsets={fieldsetsFormSignin} txtButtonSubmit="Enter" fnSubmit={handleSubmitSignin} fnChange={handleChangeSignin}/>
                        </>
                    :
                        <>
                            <h1>Signup</h1>
                            <Form action="#" method="#" fieldsets={fieldsetsFormSignup} txtButtonSubmit="Sign Up" fnSubmit={handleSubmitSignup} fnChange={handleChangeSignup}/>
                        </>
                }
            </div>
        </main>
    )
}

export default App;