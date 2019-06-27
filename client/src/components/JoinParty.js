import React from 'react'; 

export default class JoinParty extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			partyName: ''
			
		};
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
								    id="login"			   
								    name="username"
								    placeholder="party name"
								    value={this.state.partyName}
								    onChange={this.handleInputChange}
								    required
								/>
							</div>
							<button type="submit" class='btn btn-success' value="JoinParty">Join Party</button>
						</form>
					</div>
					<div class='col-sm'></div>
				</div>
			</div>
		)
	}



}