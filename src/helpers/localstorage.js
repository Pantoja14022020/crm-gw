// Utilidad para establecer el objeto de sesión en localStorage
const setSession = (sessionData) => {
    localStorage.setItem('session', JSON.stringify(sessionData));
};

// Utilidad para obtener el objeto de sesión desde localStorage
const getSession = () => {
    const sessionData = localStorage.getItem('session');
    return sessionData ? JSON.parse(sessionData) : null;
};

export {
    setSession,
    getSession
}