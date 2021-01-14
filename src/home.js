import React from 'react';
import './home.css';
import Profile from './profile.js';
const DEFAULT_USER={
    img: "https://payalchitroda.github.io/githubapi/default-avatar.png",
    name: "",
    public_repos: "",
    message: "",
    followers: "",
    following: "",
    repositories: [],
    pullrequest: 0,
    commits: 0,

} 
class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user1: {...DEFAULT_USER},
            user2: {...DEFAULT_USER},
        };

    }
    resetUser = (flag,id) => {
        var user = id === 0 ? this.state.user1 : this.state.user2
        user={...DEFAULT_USER, message: flag ? "" : "user does not exist"}
        id === 0 ? this.setState({ user1: user }) : this.setState({ user2: user })
    }
    
    getRepositories = (username, id) => {

        fetch('https://api.github.com/users/' + username + '/repos')
            .then((response) => {
                return response.json();
            }).then((data) => {
                var user = id === 0 ? this.state.user1 : this.state.user2

                data.map((repo) => {
                    user.repositories.push(repo.name)
                    this.getPullRequest(username, repo.name, id)
                    this.getCommits(username, repo.name, id)
                })

                id === 0 ? this.setState({ user1: user }) : this.setState({ user2: user })


            }).catch(function (error) {
                console.log(error);
            });

    }
    getPullRequest = (username, repo, id) => {
        var user = id === 0 ? this.state.user1 : this.state.user2;
        fetch('https://api.github.com/repos/' + username + '/' + repo + '/pulls')
            .then((response) => {
                return response.json();
            }).then((data) => {
                user.pullrequest += data.length;
                id === 0 ? this.setState({ user1: user }) : this.setState({ user2: user })

            }).catch(function (error) {
                console.log(error);
            });

    }
    getCommits = (username, repo, id) => {
        var user = id === 0 ? this.state.user1 : this.state.user2;
        fetch('https://api.github.com/repos/' + username + '/' + repo + '/stats/participation')
            .then((response) => {
                return response.json();
            }).then((data) => {
                user.commits += data.owner[51]
                id === 0 ? this.setState({ user1: user }) : this.setState({ user2: user })

            }).catch(function (error) {
                console.log(error);
            });
    }

    checkRateLimit = () => {
        fetch('https://api.github.com/rate_limit')
            .then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data)
            }).catch(function (error) {
                console.log(error);
            });
    }
    setUserValue = (id, data) => {
        var user = id === 0 ? this.state.user1 : this.state.user2;
        user = {
            img: data.avatar_url,
            name: data.name,
            public_repos: data.public_repos,
            message: "",
            followers: data.followers,
            following: data.following,
            repositories: [],
            pullrequest: 0,
            commits: 0,
        

        }

        id === 0 ? this.setState({ user1: user }) : this.setState({ user2: user })

    }
    stats = () => {

        if (this.refs.user1.value && this.refs.user2.value) {
            this.resetUser(true,0)
            this.resetUser(true,1)
            Promise.all([
                fetch('https://api.github.com/users/' + this.refs.user1.value),
                fetch('https://api.github.com/users/' + this.refs.user2.value)
            ]).then((responses) => {
                return Promise.all(responses.map((response) => {
                    return response.json();
                }));
            }).then((data) => {
               
                if (data[0].message && data[1].message) {
                    this.resetUser(false,0)
                    this.resetUser(false,1)
                }
                else if (data[0].message) {
                    this.resetUser(false,0)
                    this.getRepositories(this.refs.user2.value, 1)
                    this.setUserValue(1,data[1])
                }
                else if (data[1].message) {
                    this.resetUser(false,1)
                    this.getRepositories(this.refs.user1.value, 0)
                    this.setUserValue(0,data[0])
                }
                else {

                    this.getRepositories(this.refs.user1.value, 0)
                    this.getRepositories(this.refs.user2.value, 1)
                    this.setUserValue(0,data[0])
                    this.setUserValue(1,data[1])

                }
              
            }).catch(function (error) {
                console.log(error);
            });


        }
        else {
            alert("Enter all fields")
        }

    }
    render() {

        return (
            <div>
                <div className="left">
                    {/* <img src={this.state.user1.img} /> */}
                    <img src={this.state.user1.img} />

                    <br />   <br />

                UserName:<input ref="user1" type="text" name="user1" /><br />
                    {this.state.user1.message}<br />

                    <Profile user={this.state.user1} />

                </div>
                <div className='middle'>
                    <button onClick={() => this.stats()}>Get stats</button>
                    <button onClick={() => this.checkRateLimit()}>check rate limit</button>
                </div>
                <div className="right">
                    <img src={this.state.user2.img} />
                    <br />   <br />
             UserName:<input ref="user2" type="text" name="user2" /><br />

                    {this.state.user2.message}<br />
                    <Profile user={this.state.user2} />

                </div>

            </div>
        );
    }
}


export default Home;