import React from 'react'; 

const server = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/login' : 'prod server address'

const headers = {
	'Content-Type' : 'application/json',
	Accept: 'application/json',


	
}

export default class Login extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: ''
		};
	}

	handleInputChange = (event) => {
		const {value, name} = event.target;
		this.setState({
			[name]: value
		});
	}

	onSubmit = (event) => {
		event.preventDefault()
		//console.log(JSON.stringify(this.state))
		fetch(server, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(this.state)

		})
		.then(res => {
			
			//console.log(res.body.user)
			if(res.status === 200){

				//console.log(res.user)
				this.props.history.push('/')
				
				//console.log(`from front: ${this.state.username}`)
				//window.location.replace(`http://localhost:5000/login`)
				

				/*cant work via CORS / origin = null on a redirect
				fetch('http://localhost:5000/login', {
					method: 'GET',
					headers: headers
					
				})
				.then(res => {
					console.log(res.access_token)
				})
				.catch(err => {
					console.log('fetch error: ' + err)
				})
				*/

			} else {
				//const error = new Error(res.error);
				alert('Error logging in. Please try again');
				//throw error;

			} 
		})
		.catch(err => {
			console.error(err);
			alert('Server Error. Please try again: ');
		});
	}



	render() {
		return (
			<div class='container'>
			<div class='row'>
				<div class='col-sm'></div>
				<div class='col-sm'>
					<form onSubmit={this.onSubmit}>
						<div class="form-group">
							<input
							  	class='form-control'
							    type="text"
							    id="login"			   
							    name="username"
							    placeholder="login"
							    value={this.state.username}
							    onChange={this.handleInputChange}
							    required
							/>
						</div>
						<div class="form-group">
							<input
							  	class='form-control'
							    type="password"
							    id="password"
							    name="password"
							    placeholder="password"
							    value={this.state.password}
							    onChange={this.handleInputChange}
							    required
							/>
						</div>
							<button type="submit" class='btn btn-success' value="Log In">Submit</button>
					</form>
				</div>
				<div class='col-sm'></div>
			</div>
			</div>
			
		);
	}
}



