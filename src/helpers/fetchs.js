import axios from 'axios'


const fetchUrlPost = async (url,body) => {

    try {

        const response = await axios.post(url,body)

        return response.data
       
    } catch (error) {
        
        throw error

    }

}



const fetchUrlPut = async (url,body) => {

    try {

        const response = await axios.put(url,body)

        return response.data
       
    } catch (error) {
        
        throw error

    }

}



//Esta funcion es para crear un usuario por default, cuando se inicia la aplicacion
//Esto es para tener un usuario en la tabla y se pueda actualizar cuando estamos haciendo update en el formulario
//Sin esta funcion, el formulario Update no estaria funcionando correctamente, ya que no puede actualizar 
const createUserDefaultFirstTime = async () => {
    const response = await axios.get('https://api-gw-cpa-pc-20aq.onrender.com/user');
    const {users} = response.data;

    if(users.length === 0){//Si no hay usuarios en la tabla.... entonces crea uno por default
        const response = await fetchUrlPost('https://api-gw-cpa-pc-20aq.onrender.com/user',{"user": `{"email":"correo@gmintern.com","password": "12345"}`, "id": 1})
    }
}


export {
    fetchUrlPost,
    fetchUrlPut,
    createUserDefaultFirstTime
}