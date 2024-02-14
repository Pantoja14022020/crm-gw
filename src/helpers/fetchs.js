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



export {
    fetchUrlPost,
    fetchUrlPut
}