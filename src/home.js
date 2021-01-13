import React from 'react';
import './home.css';
import Profile from './profile.js';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user1: {
                img: "https://payalchitroda.github.io/githubapi/default-avatar.png",
                name: "",
                public_repos: "",
                message: "",
                followers: "",
                following: "",
                repositories: [],
                pullrequest: 0,
                commits: 0,


            },
            user2: {
                img: "https://payalchitroda.github.io/githubapi/default-avatar.png",
                name: "",
                public_repos: "",
                message: "",
                followers: "",
                following: "",
                repositories: [],
                pullrequest: 0,
                commits: 0,


            },
        };

    }
    resetUser1 = (flag) => {
        var user1 = this.state.user1;
        user1 = {
            message: flag ? "" : "user does not exist",
            img: "https://payalchitroda.github.io/githubapi/default-avatar.png",
            name: "",
            public_repos: "",
            followers: "",
            following: "",
            repositories: [],
            pullrequest: 0,
            commits: 0
        }
        this.setState({ user1: user1 });

    }
    resetUser2 = (flag) => {
        var user2 = this.state.user2;
        user2 = {
            message: flag ? "" : "user does not exist",
            img: "https://payalchitroda.github.io/githubapi/default-avatar.png",
            name: "",
            public_repos: "",
            followers: "",
            following: "",
            repositories: [],
            pullrequest: 0,
            commits: 0
        }
        this.setState({ user2: user2 });

    }
    getRepositories = (username, id) => {

        fetch('https://api.github.com/users/' + username + '/repos')
            .then((response) => {

                return response.json();
            }).then((data) => {
                var user = id == 0 ? this.state.user1 : this.state.user2

                data.map((repo) => {
                    user.repositories.push(repo.name)
                    this.getPullRequest(username, repo.name, id)
                    this.getCommits(username, repo.name, id)
                })

                id == 0 ? this.setState({ user1: user }) : this.setState({ user2: user })


            }).catch(function (error) {
                console.log(error);
            });

    }
    getPullRequest = (username, repo, id) => {
        var user = id == 0 ? this.state.user1 : this.state.user2;
        fetch('https://api.github.com/repos/' + username + '/' + repo + '/pulls')
            .then((response) => {
                return response.json();
            }).then((data) => {
                //console.log("pull request"+data)
                user.pullrequest += data.length;
                id == 0 ? this.setState({ user1: user }) : this.setState({ user2: user })

            }).catch(function (error) {
                console.log(error);
            });

    }
    getCommits = (username, repo, id) => {
        var user = id == 0 ? this.state.user1 : this.state.user2;
        fetch('https://api.github.com/repos/' + username + '/' + repo + '/stats/participation')
            .then((response) => {
                return response.json();
            }).then((data) => {
                console.log(repo)
                console.log(data)
                user.commits += data.owner[51]
                id == 0 ? this.setState({ user1: user }) : this.setState({ user2: user })

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
    stats = () => {

        if (this.refs.user1.value && this.refs.user2.value) {
            this.resetUser1(true)
            this.resetUser2(true)
            Promise.all([
                fetch('https://api.github.com/users/' + this.refs.user1.value),
                fetch('https://api.github.com/users/' + this.refs.user2.value)
            ]).then((responses) => {
                return Promise.all(responses.map((response) => {
                    return response.json();
                }));
            }).then((data) => {
                var user1 = this.state.user1;
                var user2 = this.state.user2;

                if (data[0].message && data[1].message) {
                    this.resetUser1(false)
                    this.resetUser2(false)
                }
                else if (data[0].message) {
                    this.resetUser1(false)
                    this.getRepositories(this.refs.user2.value, 1)
                    user2.img = data[1].avatar_url;
                    user2.name = data[1].name;
                    user2.public_repos = data[1].public_repos;
                    user2.message = "";
                    user2.followers = data[1].followers
                    user2.following = data[1].following
                }
                else if (data[1].message) {
                    this.resetUser2(false)
                    this.getRepositories(this.refs.user1.value, 0)
                    user1.img = data[0].avatar_url;
                    user1.name = data[0].name;
                    user1.public_repos = data[0].public_repos;
                    user1.message = "";
                    user1.followers = data[0].followers
                    user1.following = data[0].following

                }
                else {

                    this.getRepositories(this.refs.user1.value, 0)
                    this.getRepositories(this.refs.user2.value, 1)
                    user1.img = data[0].avatar_url;
                    user1.name = data[0].name;
                    user1.public_repos = data[0].public_repos;
                    user1.message = "";
                    user1.followers = data[0].followers
                    user1.following = data[0].following


                    user2.img = data[1].avatar_url;
                    user2.name = data[1].name;
                    user2.public_repos = data[1].public_repos;
                    user2.message = "";
                    user2.followers = data[1].followers
                    user2.following = data[1].following




                }
                this.setState({ user1: user1, user2: user2 });

                // console.log(data);


            }).catch(function (error) {
                console.log(error);
            });


        }
        else {
            alert("Enter all fields")
        }
        console.log(this.state.user1)

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