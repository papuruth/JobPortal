const isLoggedIn = () => {
    const currentUser = !!JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
}

export default isLoggedIn;