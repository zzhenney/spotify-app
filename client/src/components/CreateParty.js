import React from 'react'; 

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