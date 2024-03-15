import {useState, useEffect, useContext, useRef} from 'react'
import Button from './components/Button'
import './styles/login.css'
import './styles/components/button.css'
import './styles/components/modal-primary.css'
import './styles/components/load.css'
import './styles/components/form.css'
import Form from './components/Form'
import Modal from './components/Modal'
import {fetchUrlPost, fetchUrlPut} from './helpers/fetchs'
import {setSession} from './helpers/localstorage'

export function Login(){
    //My status
    const [typeForm, setTypeForm] = useState("login") //I have a state to control type form to show
    const [valoresSignin, setValoresSignin] = useState({
        email: '',
        password: '',
    });
    const [valoresNewPassword, setValoresNewPassword] = useState({
        email: '',
        password: '',
        confirm: ''
    });
    const [modal,setModal] = useState(false);
    const [message,setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [type,setType] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);
    const formRef = useRef(null); //Creamos la referencia del fomulario, algo como global var

    //Here we have input´s attributes represented as object, each i make a form, it should own a array of objects
    const fieldsetsFormLogin = [
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

    const fieldsetsFormNewPassword = [
        {
            id: "email",
            name: "email",
            type: "email",
            htmlfor: "email",
            txt: "What's your email?"
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
        if (formRef.current) {//Si existe referenciado de forma global un form, entonces...
            formRef.current.reset();
        }
    }
    const setNewPasswordForm = () => {
        setTypeForm('password')
        if (formRef.current) {//Si existe referenciado de forma global un form, entonces...
            formRef.current.reset();
        }
    }


    //Functions abou what to do after clic button 'submit' in form - que hacer despues de que se envie el formulario?
    //Formulario Signin
    const handleSubmitLogin = async e => {
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
            //const credentials = {"email_send": email, "password_send": password}
            
            
            //Do fetch to start session
            //const {session,id_user,msg,area,fullname} = await fetchUrlPost("https://api-gw-cpa-pc-20aq.onrender.com/gw/session",credentials)
            
            let session = false;
            if((email == 'pcontreras@trabajolegalusa.com' && password == "12345678") || (email == "agent003@gmintern.com" && password == "12345678")){
                session = true;
            }

            //console.log(session)

            if(session){//Its okay if; coincide el email y password, redirige al dashboard
                //const sessionData = {id_user,email,msg,area,fullname}
                
                if(email == 'pcontreras@trabajolegalusa.com'){
                    const sessionData = {
                        id_user: 1,
                        email: 'pcontreras@trabajolegalusa.com',
                        msg: 'Welcome pcontreras@trabajolegalusa.com',
                        area: "tl",
                        fullname: "Perla Esthefany"
                    }
                    setSession(sessionData)//Guardamos datos del usuario en el local storage
                }

                if(email == 'agent003@gmintern.com'){
                    const sessionData = {
                        id_user: 2,
                        email: 'agent003@gmintern.com',
                        msg: 'Welcome agent003@gmintern.com',
                        area: "gm",
                        fullname: "Gabriela Ramos"
                    }
                    setSession(sessionData)//Guardamos datos del usuario en el local storage
                }
                
                window.location.href = '/'//Aqui lo redirigo a la pagina del dashboard
                //isLogged(true)//Para que haga el efecto de cambio de pantalla
                setShowSpinner(false)
            }else if(!session){
                //Mostramos un modal
                setModal(true)
                setTitle('Error To Log In')
                setMessage('Incorrect password or email not valid')
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

            setValoresSignin({email: '',password:''})
            //Reset inputs in form
            e.target.reset()

        } 
    }
    const handleChangeLogin = e => {//Cuando se este escribiendo en un input
        const { name, value } = e.target;//Actaulizar el estado de los valores 
        setValoresSignin({
            ...valoresSignin,
            [name]: value
        });
    }





    //Formulario New Password
    const handleSubmitNewPassword = async e => {
        e.preventDefault();
        const {email,password,confirm} = valoresNewPassword;
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
            }else if(password.length < 8){
                setModal(true)
                setTitle("Invalid password")
                setMessage("Your password must have at least 8 characters")
                setType("error")
            }else{//Finally here we updated account

                setShowSpinner(true);

                const {email,password} = valoresNewPassword;//Obten lo que se escribio en el formulario

                const account_update = {
                    "email_send": email,
                    "new_password": password
                }

                //Do fetch to update ESTE ESTA RELACIONADON CON EL EFFECT
                const {updated,msg} = await fetchUrlPut("https://api-gw-cpa-pc-20aq.onrender.com/gw/user",account_update)//Just update first element in table
                
                if(updated){
                    //Show modal
                    setModal(true)
                    setTitle("Updated Success")
                    setMessage(msg)
                    setType("success")
                    setShowSpinner(false)
                }else if(!updated){
                    //Mostramos un modal
                    setModal(true)
                    setTitle('Error To Update')
                    setMessage(msg)
                    setType('error')
                    setShowSpinner(false)   
                }else{
                    //Mostramos un modal
                    setModal(true)
                    setTitle('Error In Server')
                    setMessage(msg)
                    setType('error')
                    setShowSpinner(false)
                }

                //Reset values in state
                setValoresNewPassword({email: '',password:'',confirm:''})
                //Reset inputs in form
                e.target.reset()
                
            }
        }
    }
    const handleChangeNewPassword = e => {//Cuando se este escribiendo en un input
        const { name, value } = e.target;//Actaulizar el estado de los valores 
        setValoresNewPassword({
            ...valoresNewPassword,
            [name]: value
        });
    }




    
    //Una vez aparezca el moda, eliminarlo pasado los x segundos
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setModal(false)
        },5000)
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
                            {/**<p>Forgot your password?</p>
                            <Button color="#fff" txt='Click here' fn={setNewPasswordForm} size="auto-fit" bgColor="#2020cc"/>**/}
                        </>
                    : 
                        <>
                            <Button color="#fff" txt='Sign In' fn={setLoginForm} size="auto-fit" bgColor="#2020cc"/>
                        </>
                }
            </nav>
            <div className="form-container">
                
                {
                    typeForm === "login" 
                    ?
                        <>
                            <h1>Sign In</h1>
                            <Form widthForm="300px" action="#" method="#" fieldsets={fieldsetsFormLogin} txtButtonSubmit="Enter" fnSubmit={handleSubmitLogin} fnChange={handleChangeLogin} showSpinner={showSpinner} reform={formRef}/>
                        </>
                    :
                        <>
                            <h1>New Password</h1>
                            <Form widthForm="300px" action="#" method="#" fieldsets={fieldsetsFormNewPassword} txtButtonSubmit="Done" fnSubmit={handleSubmitNewPassword} fnChange={handleChangeNewPassword} showSpinner={showSpinner} reform={formRef}/>
                        </>
                }
            </div>
        </main>
    )
}


export default Login;