import React from 'react';
import './home.css';
import Profile from './profile.js';

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user1: {
                img: "default-avatar.png",
                name: "",
                public_repos: "",
                message: "",
                followers: "",
                following: "",
                repositories: [],
                pullrequest: 0,


            },
            user2: {
                img: "default-avatar.png",
                name: "",
                public_repos: "",
                message: "",
                followers: "",
                following: "",
                repositories: [],
                pullrequest: 0,

            },
        };

    }
    resetUser1 = () => {
        var user1 = this.state.user1;
        user1.message = "user does not exist";
        user1.img = "default-avatar.png"
        user1.name = ""
        user1.public_repos = ""
        user1.followers = ""
        user1.following = ""
        user1.repositories = []
        user1.pullrequest = 0
        this.setState({ user1: user1 });

    }
    resetUser2 = () => {
        var user2 = this.state.user2;
        user2.message = "user does not exist";
        user2.img = "default-avatar.png"
        user2.name = ""
        user2.public_repos = ""
        user2.followers = ""
        user2.following = ""
        user2.repositories = []
        user2.pullrequest = 0
        this.setState({ user2: user2 });

    }
    getRepositories = () => {
        Promise.all([
            fetch('https://api.github.com/users/' + this.refs.user1.value + '/repos'),
            fetch('https://api.github.com/users/' + this.refs.user2.value + '/repos')
        ]).then((responses) => {
            return Promise.all(responses.map((response) => {
                return response.json();
            }));
        }).then((data) => {
            var user1 = this.state.user1
            var user2 = this.state.user2

            data[0].map((repo) => {
                user1.repositories.push(repo.name)
                user1.pullrequest += this.getPullRequest(repo.name)

            })
            console.log(user1.pullrequest)

            data[1].map((repo) => {
                user2.repositories.push(repo.name)
                user2.pullrequest += this.getPullRequest(repo.name)

            })
            console.log(user2.pullrequest)
            this.setState({ user1: user1, user2: user2 });


        }).catch(function (error) {
            console.log(error);
        });

    }
    getPullRequest = (repo) => {
        var count = 0;
        fetch('https://api.github.com/repos/' + this.refs.user1.value + '/' + repo + '/pulls')
            .then((response) => {
                return response.json();
            }).then((data) => {
                //console.log("length"+data.length);
                count = data.length
                // console.log("count"+count);

            }).catch(function (error) {
                console.log(error);
            });
        console.log("count" + count);
        return count;
    }
    stats = () => {

        if (this.refs.user1.value && this.refs.user2.value) {
            this.getRepositories()
            Promise.all([
                fetch('https://api.github.com/users/' + this.refs.user1.value),
                fetch('https://api.github.com/users/' + this.refs.user2.value)
            ]).then((responses) => {
                return Promise.all(responses.map((response) => {
                    //   console.log(response.status)
                    return response.json();
                }));
            }).then((data) => {
                var user1 = this.state.user1;
                var user2 = this.state.user2;

                if (data[0].message && data[1].message) {
                    this.resetUser1()
                    this.resetUser2()
                }
                else if (data[0].message) {
                    this.resetUser1()
                    user2.img = data[1].avatar_url;
                    user2.name = data[1].name;
                    user2.public_repos = data[1].public_repos;
                    user2.message = "";
                    user2.followers = data[1].followers
                    user2.following = data[1].following
                }
                else if (data[1].message) {
                    this.resetUser2()
                    user1.img = data[0].avatar_url;
                    user1.name = data[0].name;
                    user1.public_repos = data[0].public_repos;
                    user1.message = "";
                    user1.followers = data[0].followers
                    user1.following = data[0].following

                }
                else {
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

    }
    render() {

        return (
            <div>
                <div className="left">
                    <img src={this.state.user1.img} />
                    <br />   <br />

                UserName:<input ref="user1" type="text" name="user1" /><br />
                    {this.state.user1.message}<br />

                    <Profile user={this.state.user1} />

                </div>
                <div className="right">
                    <img src={this.state.user2.img} />
                    <br />   <br />
             UserName:<input ref="user2" type="text" name="user2" /><br />

                    {this.state.user2.message}<br />
                    <Profile user={this.state.user2} />

                </div>

                <button onClick={() => this.stats()}>Get stats</button>

            </div>
        );
    }
}


export default Home;