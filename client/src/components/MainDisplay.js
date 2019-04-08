import React from 'react';

const MainDisplay = (props) => {

	return(
		<div className="row">
            <div className="col-med-5">
              <iframe style={{float: 'left'}} title="spotifyPlayer" src={`https://open.spotify.com/embed/playlist/${props.currSong}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
            <div className="col-med-9">
            </div>   
    	</div>
    );

}

export default MainDisplay;