// Utilidad para establecer el objeto de sesión en localStorage
const setSession = (sessionData) => {
    localStorage.setItem('session', JSON.stringify(sessionData));
};

// Utilidad para obtener el objeto de sesión desde localStorage
const getSession = () => {
    const sessionData = localStorage.getItem('session');
    return sessionData ? JSON.parse(sessionData) : null;
};


const getUserLogged = () => {
    const sessionData = JSON.parse(localStorage.getItem('session'));
    return sessionData;
}

//Obtener el tipo de usuario que inicio sesion, (gw, gm o tl?)
const getTypeUser = () => {
    const {area} = JSON.parse(localStorage.getItem('session'))
    return area
}
const saveOptionSelected = (option) => {
    localStorage.setItem('optionSelected',option)
}


const getOptionSelectedFromLocalStorage = () => {
    const option = localStorage.getItem('optionSelected')
    return option
}

export {
    setSession,
    getSession,
    getTypeUser,
    saveOptionSelected,
    getOptionSelectedFromLocalStorage,
    getUserLogged
}