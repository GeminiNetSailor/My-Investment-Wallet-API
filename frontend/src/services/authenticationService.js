import BaseService from "./baseService";

/**
 * POST /api/v1/login
 * */

class AuthenticationService extends BaseService {
	/*
	 * SignUp
	 */
	login(emailAddress, password) {
		var requestOptions = {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email_address: emailAddress,
				password
			})
		};

		return fetch('/v1/authentication/login', requestOptions)
			.then(this.handleResponse)
			.then(response => {
				if (response.access_token) {
					localStorage.setItem('token', response.access_token);
					localStorage.setItem('user', JSON.stringify(response.user));
				}
				return response.user;
			})
			.catch(error => { console.log(error); throw error });
	}

	/*
	 * SignUp
	 */
	signUp() { }

	/*
	 * POST /api/v1/signin
	 */
	logout() {
		return new Promise(
			(resolve, reject) => {
				if (!localStorage.clear()) resolve(true);
				reject(false);
			}
		);
	}

	isTokenExpired(token = localStorage.getItem('token')) {
		try {
			const decoded = this.decode(token);
			if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
				return true;
			}
			else
				return false;
		}
		catch (err) {
			return false;
		}
	}

	decode(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		return JSON.parse(window.atob(base64));
	}
}
export default new AuthenticationService();