import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import NavBar from './navBar';
import RegisterForm from './registerForm';
import Landing from './landing';
import LoginForm from './loginForm';
import RecoverForm from './recoverForm';

export function withCustomAuthenticator(Comp){
    return class extends Component{
        constructor(props){
            super(props);
            this.state = {
                authState : props.authState || 'gettingSession',
                authData: props.authData || null 
            }
        }

        handleSignIn = (username, password) => {
            return new Promise((resolve, reject) => {
                Auth.signIn(username, password)
                    .then(response => {
                        this.setState({ loading: false });
                        const { challengeName } = response;
                        if (challengeName === 'NEW_PASSWORD_REQUIRED') {
                            this.setState({ authState: 'forceChangePassword', authData: response });
                        } else {
                            this.setState({ authState: 'signedIn', authData: response });
                        }
                        resolve();
                    })
                    .catch(err => {
                        console.log('Error', err);
                        this.setState({ authState: 'unauthenticated', authData: null });
                        reject(err.message);
                    });
            });
        }

        handleCompletePassword = (user, password, requiredAttributes) => {
            return new Promise((resolve, reject) => {
                Auth.completeNewPassword(user, password, requiredAttributes)
                    .then((response) => {
                        console.log('complete password', response);
                        this.setState({ authState: 'signedIn', authData: response });
                        resolve();
                    }).catch((err) => {
                        reject(err.message);
                    });
            });
        }

        handleSignOut = () => {
            return new Promise((resolve, reject) => {
                Auth.signOut()
                    .then(response => {
                        this.setState({ authState: 'unauthenticated', authData: null });
                        resolve();
                    })
                    .catch(err => {
                        this.setState({ authState: 'unauthenticated', authData: null });
                        reject(err.message);
                    })
            });

        }


        componentDidMount() {
            Auth.currentSession()
                .then(((session) => {
                    this.setState({ authState: "signedIn", authData: session });
                })).catch((error) => {
                    this.setState({ authState: "unauthenticated", authData: null });
                })
        }


        render(){
            const { authState } = this.state;
            if (authState === 'gettingSession') {
                return <Landing />;
            }
            else if(authState == 'forceChangePassword'){
                const authProps = {
                    completeNewPassword: this.handleCompletePassword,
                    user: this.state.authData
                };
                return <RecoverForm authProps={authProps} changeState={this.handleAuthStateChange}/>
            }
            else if(authState === 'unauthenticated'){
                const authProps = {
                    signIn: this.handleSignIn
                };
                return <LoginForm authProps={authProps} changeState={this.handleAuthStateChange}/>
            }
            else if (authState === 'signedIn') {
                const authProps = {
                    signOut: this.handleSignOut
                };
                return <Comp authProps={authProps} {...this.props} />
            }
        }
    }
}