import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import Landing from './landing';
import RecoverForm from './recoverForm';
import FrontPage from './frontPage';
import ConfirmationForm from './confirmForm';

export function withCustomAuthenticator(Comp) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                authState: props.authState || 'gettingSession',
                authData: props.authData || null,
                username: '',
                password: ''
            }
        }

        handleSignUp = (username, password, name) => {
            this.setState({ username: username, password: password })
            return new Promise((resolve, reject) => {
                Auth.signUp({
                    username: username,
                    password: password,
                    attributes: {
                        email: username,
                        name: name
                    }
                })
                    .then(response => {
                        this.setState({ loading: false });
                        console.log('SignUp', response)
                        this.handleSignIn(username, password)
                        resolve()

                    })
                    .catch(err => {
                        console.log('Error', err);
                        this.setState({ authState: 'unauthenticated', authData: null });
                        reject(err.message);
                    })
            });
        }

        handleSignIn = (username, password) => {
            this.setState({ username: username, password: password })
            return new Promise((resolve, reject) => {
                Auth.signIn(username, password)
                    .then(response => {
                        this.setState({ loading: false });
                        const { challengeName } = response;
                        console.log(challengeName)
                        if (challengeName === 'NEW_PASSWORD_REQUIRED') {
                            this.setState({ authState: 'forceChangePassword', authData: response });
                        } else {
                            this.setState({ authState: 'signedIn', authData: response });
                        }
                        resolve();
                    })
                    .catch(err => {
                        console.log('Error', err);
                        if (err.code === 'UserNotConfirmedException') {
                            this.setState({ authState: 'confirmAccount', authData: null });
                        } else {
                            this.setState({ authState: 'unauthenticated', authData: null });
                        }
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

        handleConfirmSignUp = (code) => {
            const username = this.state.username
            return new Promise((resolve, reject) => {
                Auth.confirmSignUp(username, code, {
                    forceAliasCreation: true
                }).then(response => {
                    console.log(response)
                    const password = this.state.password
                    this.handleSignIn(username, password)
                    resolve()
                })
                    .catch(err => {
                        console.log('Error', err);
                        reject(err.message);
                    })
            })
        }


        componentDidMount() {
            Auth.currentSession()
                .then(((session) => {
                    this.setState({ authState: "signedIn", authData: session });
                })).catch((error) => {
                    this.setState({ authState: "unauthenticated", authData: null });
                })
        }


        render() {
            const { authState } = this.state;
            if (authState === 'gettingSession') {
                return <Landing />;
            }
            else if (authState == 'forceChangePassword') {
                const authProps = {
                    completeNewPassword: this.handleCompletePassword,
                    user: this.state.authData
                };
                return <RecoverForm authProps={authProps} changeState={this.handleAuthStateChange} />
            }
            else if (authState === 'confirmAccount') {
                const authProps = {
                    email: this.state.username,
                    confirmSignUp: this.handleConfirmSignUp
                }
                return <ConfirmationForm authProps={authProps} changeState={this.handleAuthStateChange} />
            }
            else if (authState === 'unauthenticated') {
                const authProps = {
                    signIn: this.handleSignIn,
                    signUp: this.handleSignUp
                };
                return <FrontPage authProps={authProps} changeState={this.handleAuthStateChange} />
            }
            else if (authState === 'signedIn') {
                const authProps = {
                    signOut: this.handleSignOut,
                    signed: true
                };
                return <Comp authProps={authProps} {...this.props} />
            }
        }
    }
}