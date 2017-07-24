import auth0 from 'auth0-js';
import {AUTH_CONFIG} from './auth0-variables';
import {Goto, Actions} from 'jumpsuit';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: AUTH_CONFIG.domain,
        clientID: AUTH_CONFIG.clientId,
        redirectUri: AUTH_CONFIG.callbackUrl,
        audience: `https://${AUTH_CONFIG.domain}/userinfo`,
        responseType: 'token id_token',
        scope: 'openid profile'
    });

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        const auth0 = this.auth0;
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.loadUser();
                Actions.goHome();
            } else if (err) {
                Actions.goHome();
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        // navigate to the home route
        Actions.goHome();
    }

    logout() {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // navigate to the home route
        Actions.resetUser();
        Actions.goHome();
    }

    get accessToken() {
        return localStorage.getItem('access_token');
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        if (!this.accessToken) return false;
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    loadUser() {
        if (!this.isAuthenticated()) return;

        this.auth0.client.userInfo(this.accessToken, (err, user) => {
            if (user) {
                Actions.setUser(user);
            } else {
                Actions.resetUser();
            }
        });
    }
}
