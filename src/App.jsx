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
        email: '',
        password: '',
        confirm: ''
    });
    const [modal,setModal] = useState(false);
    const [message,setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [type,setType] = useState("");

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

    const fieldsetsFormUpdate = [
        {
            id: "email",
            name: "email",
            type: "text",
            htmlfor: "email",
            txt: "Type your new email"
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
    const setUpdateForm = () => {
        setTypeForm('update')
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
            setType("error")
        }else{
            //Here we need to start session
            //Reset values in state
            setValoresSignin({email: '',password:''})
            //Reset inputs in form
            e.target.reset()
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
    const handleSubmitUpdate = e => {
        e.preventDefault();
        const {email,password,confirm} = valoresSignup;
        if(!(email && password && confirm)){//Si ambos inputs no estan completos
            setModal(true)
            setTitle("Incomplete Fields")
            setMessage("Fill all fields")
            setType("error")
        } else{
            if(password !== confirm){
                setModal(true)
                setTitle("Not Match")
                setMessage("Your passwords don´t match")
                setType("error")
            }else{//Finally here we updated account
                //Show modal
                setModal(true)
                setTitle("Updated Success")
                setMessage("Your account is updated")
                setType("success")
                //Reset values in state
                setValoresSignup({email: '',password:'',confirm:''})
                //Reset inputs in form
                e.target.reset()
            }
        }
    }

    const handleChangeUpdate = e => {//Cuando se este escribiendo en un input
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
                        <><div className="modal-container-login"><Modal title={title} message={message} type={type}/></div></>
                    :
                        <></>

                }
                

            <nav className='buttons-login'> 
                {
                    typeForm === "login" 
                    ?
                        <>
                            <p>Forgot credentials? Update account</p>
                            <Button txt='Update' fn={setUpdateForm} />
                        </> 
                    : 
                        <>
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
                            <h1>Update</h1>
                            <Form action="#" method="#" fieldsets={fieldsetsFormUpdate} txtButtonSubmit="Update" fnSubmit={handleSubmitUpdate} fnChange={handleChangeUpdate}/>
                        </>
                }
            </div>
        </main>
    )
}

export default App;