class Authentication {

    // eslint-disable-next-line
    constructor() {

    }

    isAuthentication() {
        const token = localStorage.getItem('token');
        return token;
    }

    isAuthorizationAdmin() {
        const role = localStorage.getItem("role");
        return atob(role) === "ROLE_ADMIN";
    }

    isAuthorizationSeller() {
        const role = localStorage.getItem("role");
        return atob(role) === "ROLE_SELLER";
    }

    isAuthorization() {
        const role = localStorage.getItem("role");
        return atob(role) === "ROLE_ADMIN" || atob(role) === "ROLE_SELLER";
    }

}

const authentication = new Authentication();
export { authentication };
