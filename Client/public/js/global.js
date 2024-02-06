// the following makes the buttons on the top-left corner (menu buttons) send to the appropriate location based on name
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("Home").addEventListener("click", function () { window.location.href = "/home" })
    const portfolio = document.getElementById("Portfolio")
    if (portfolio !== null) {
        portfolio.addEventListener("click", function () { window.location.href = "/portfolio" })
    }
// for user account
    const yourAccount = document.getElementById("YourAccount")
    if (yourAccount !== null) {
        yourAccount.addEventListener("click", function () { window.location.href = "/account" })
    }
// for the user to logout it directs them to the home page which contains the option to log in again
    const logout = document.getElementById("Logout")
    if (logout !== null) {
        logout.addEventListener("click", function () { window.location.href = "/home" })
    }
// for user login
    const login = document.getElementById("Login")
    if (login !== null) {
        login.addEventListener("click", function () { window.location.href = "/login" })
    }
// for user registration
    const register = document.getElementById("Register")
    if (register !== null) {
        register.addEventListener("click", function () { window.location.href = "/register" })
    }



    //const clickregister = document.getElementById("RegisterButton")
    //if (clickregister != null) {
    //    clickregister.addEventListener("click", function () { window.location.href = "/register" })
   // }
}) 

