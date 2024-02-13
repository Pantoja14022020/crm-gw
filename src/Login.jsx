import {useState, useEffect, useContext} from 'react'
import Button from './components/Button'
import './styles/login.css'
import './styles/components/button.css'
import './styles/components/modal-primary.css'
import './styles/components/load.css'
import './styles/components/form.css'
import Form from './components/Form'
import Modal from './components/Modal'
import {fetchUrlPost, fetchUrlPut, createUserDefaultFirstTime} from './helpers/fetchs'

export function Login(){
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
    const [showSpinner, setShowSpinner] = useState(false);

    //Here we have input´s attributes represented as object, each i make a form, it should own a array of objects
    const fieldsetsFormSignin = [
        {
            id: "email",
            name: "email",
            type:"email",
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
            type: "email",
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
    const handleSubmitSignin = async e => {
        e.preventDefault();
        const {email,password} = valoresSignin;
        if(!(email && password)){//Si ambos inputs no estan completos
            setModal(true)
            setTitle("Incomplete Fields")
            setMessage("Fill all fields")
            setType("error")
        }else{

            setShowSpinner(true)//Show spinner when i send data

            //Here we need to start session
            //Reset values in state
            const {email,password} = valoresSignin;
            const credentials = {"email_send": email, "password_send": password}
            
            setValoresSignin({email: '',password:''})
            //Reset inputs in form
            e.target.reset()
            
            //Do fetch to start session
            const {session,id_user,msg} = await fetchUrlPost("https://api-gw-cpa-pc-20aq.onrender.com/session",credentials)
            
            if(session){//Its okay if; coincide el email y password, redirige al dashboard
                console.log("Session started")
                window.location.href = '/dashboard'//Aqui lo redirigo a la pagina del dashboard
                setShowSpinner(false)
            }else if(!session){
                //Mostramos un modal
                setModal(true)
                setTitle('Error To Log In')
                setMessage(msg)
                setType('error')
                setShowSpinner(false)
            }
            else{//Aqui es cuando session no existe  o es indefinido
                //Mostramos un modal
                setModal(true)
                setTitle('Error In Server')
                setMessage('It was an error on server')
                setType('error')
                setShowSpinner(false)
            }

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
    const handleSubmitUpdate = async e => {
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

                setShowSpinner(true);

                const {email,password} = valoresSignup;

                const new_credentials = `{"email":"${email}","password":"${password}"}`;//Lo formateo tal como debe estar en la base de datos

                const account_update = {
                    "user": new_credentials,
                    "id": 1
                }

                //Reset values in state
                setValoresSignup({email: '',password:'',confirm:''})
                //Reset inputs in form
                e.target.reset()

                //Do fetch to update ESTE ESTA RELACIONADON CON EL EFFECT
                const {updated} = await fetchUrlPut("https://api-gw-cpa-pc-20aq.onrender.com/user/1",account_update)//Just update first element in table
                
                if(updated){
                    //Show modal
                    setModal(true)
                    setTitle("Updated Success")
                    setMessage("Your account is updated")
                    setType("success")
                    setShowSpinner(false)
                }else if(!updated){
                    //Mostramos un modal
                    setModal(true)
                    setTitle('Error To Update')
                    setMessage('It was not posibble update account')
                    setType('error')
                    setShowSpinner(false)   
                }else{
                    //Mostramos un modal
                    setModal(true)
                    setTitle('Error In Server')
                    setMessage('It was an error on server')
                    setType('error')
                    setShowSpinner(false)
                }
                
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



    useEffect(()=>{//Se ejecuta una vez, cuando carga la APP
        createUserDefaultFirstTime();
    },[])


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
                            <p>Forgot credentials? Set account</p>
                            <Button txt='Set' fn={setUpdateForm} size="auto-fit"/>
                        </> 
                    : 
                        <>
                            <Button txt='Login' fn={setLoginForm} size="auto-fit"/>
                        </>
                }
            </nav>
            <div className="form-container">
                
                {
                    typeForm === "login" 
                    ?
                        <>
                            <h1>Sign In</h1>
                            <Form action="#" method="#" fieldsets={fieldsetsFormSignin} txtButtonSubmit="Enter" fnSubmit={handleSubmitSignin} fnChange={handleChangeSignin} showSpinner={showSpinner}/>
                        </>
                    :
                        <>
                            <h1>Update</h1>
                            <Form action="#" method="#" fieldsets={fieldsetsFormUpdate} txtButtonSubmit="Update" fnSubmit={handleSubmitUpdate} fnChange={handleChangeUpdate} showSpinner={showSpinner}/>
                        </>
                }
            </div>
        </main>
    )
}


export default Login;