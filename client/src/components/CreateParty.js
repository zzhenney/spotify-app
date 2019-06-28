import React from 'react'; 

const server = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/playlist/create' : 'prod server address'

const headers = {
	'Content-Type' : 'application/json',
	Accept: 'application/json',


	
}

export default class CreateParty extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			partyName: ''
			
		};
	}

	handleInputChange = (event) => {
		const {value, name} = event.target;
		this.setState({
			[name]: value
		});
	}

	onSubmit = (event) => {
		let name = {partyName: this.state.partyName}
		console.log(JSON.stringify(name))
		event.preventDefault()
		//console.log(JSON.stringify(this.state))

		fetch(server, {
			credentials: 'include',
			method: 'POST',
			body: JSON.stringify(name),
			headers: headers


		})
		.then(res => {
			
			console.log(res)
			if(res.status === 200){


				//console.log(res.user)
				this.props.history.push('/search')
				
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
				alert('Error Creating Party. Please try again');
				//throw error;

			} 
		})
		.catch(err => {
			console.error(err);
			alert(`Server Error. Please try again: ${err}`);
		});
	}


	render(){
		return(
			<div class='container'>
				<div class='row'>
					<div class='col-sm'></div>
					<div class='col-sm'>
						<form onSubmit={this.onSubmit}>
							<div class="form-group">
								<input
								  	class='form-control'
								    type="text"
								    id="partyName"			   
								    name="partyName"
								    placeholder="party name"
								    value={this.state.partyName}
								    onChange={this.handleInputChange}
								    required
								/>
							</div>
							<button type="submit" class='btn btn-success' value="create-party">Create Party</button>
						</form>
					</div>
					<div class='col-sm'></div>
				</div>
			</div>
		)
	}

}











