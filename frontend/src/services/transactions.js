import BaseService from "./baseService";

export default class Transactions extends BaseService {

    constructor(){
        super();
        this.endPoint = 'transactions/';
    }

    /**
     * POST /process
     * */
	create(body) {

		var url = new URL(this.urls.version + this.endPoint, this.baseUrl);

		var requestOptions = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
			body: JSON.stringify(body)
		};

		return fetch(url, requestOptions)
			.then(this.handleResponse)
			.then(response => { return response; })
			.catch(error => { console.log(error); throw error });
    }
}