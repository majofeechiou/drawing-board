'use strict';

export default class http {

	// Method that performs the ajax request
	static ajax(str_method, str_url, json_args) {

		// Creating a promise
		let promise = new Promise( function (resolve, reject) {

			// Instantiates the XMLHttpRequest
			let client = new XMLHttpRequest();
			let uri = str_url;

			if (json_args && (str_method === 'POST' || str_method === 'PUT')) {
				uri += '?';
				let argcount = 0;
				for (let key in json_args) {
					if (json_args.hasOwnProperty(key)) {
						if (argcount++) {
							uri += '&';
						}
						uri += encodeURIComponent(key) + '=' + encodeURIComponent(json_args[key]);
					}
				}
			}

			client.open(str_method, uri, true);
			client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			client.setRequestHeader("Content-length", uri.length);
			client.setRequestHeader("Connection", "close");
			client.send();

			client.onload = function () {
				if (this.status >= 200 && this.status < 300) {
					// Performs the function "resolve" when this.status is equal to 2xx
					resolve(this.response);
				} else {
					// Performs the function "reject" when this.status is different than 2xx
					reject(this.statusText);
				}
			};
			client.onerror = function () {
				reject(this.statusText);
			};
		});

		// Return the promise
		return promise;
	};

	// Adapter pattern
	static get(str_url, json_args) {
		return this.ajax('GET', str_url, json_args);
	};
	static post(str_url, json_args) {
		return this.ajax('POST', str_url, json_args);
	};
	static put(str_url, json_args) {
		return this.ajax('PUT', str_url, json_args);
	};
	static delete(str_url, json_args) {
		return this.ajax('DELETE', str_url, json_args);
	};
};