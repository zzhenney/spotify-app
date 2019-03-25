# Authentication instructions 

1. create 'config.js' file with format: 

```
const config = {
	client_id: CLIENTID, 
	client_secret:  CLIENTSECRET,
	redirect_uri: 'http://localhost:5000/callback'

}

module.exports = config;


```


2. run command 'run dev' to start front and backend servers 

3. go to 'localhost:5000/login' in browser. This will start spotify's authentication process and redirect you to the front end server with a valid access token 



