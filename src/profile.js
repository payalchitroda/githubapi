import React from 'react';

class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
           
        };

    

    }
    render() {
        const { user } = this.props
        return (
            <div>
             Name: {user.name}<br/>
             Repositories: {user.public_repos}<br/>
             Followers: {user.followers}<br/>
             Following: {user.following}
            </div>
        );
    }
}


export default Profile;