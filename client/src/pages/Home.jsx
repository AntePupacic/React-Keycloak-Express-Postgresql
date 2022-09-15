import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import Navbar from '../components/Navbar';
import UserCources from '../components/GetUserCources';
import AdminCources from '../components/GetAdminCources';
import AdminStudents from '../components/GetAdminStudents';
import UserGrades from '../components/GetUserGrades';
import { Route } from 'react-router-dom';
import spinner from '../assets/spinner.gif';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false };
    }

    withProps(Component, props) {
        return function (matchProps) {
            return <Component {...props} {...matchProps} />
        }
    }

    componentDidMount() {
        const keycloak = Keycloak('/keycloak.json');
        keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
            this.setState({ keycloak: keycloak, authenticated: authenticated })
            if (authenticated) {
                window.accessToken = keycloak.token;
                console.log(keycloak.token);
            }
        })
    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) return (
                <div>
                    <Navbar keycloak={this.state.keycloak} />
                    {this.state.keycloak.hasResourceRole('user') && (<div className="container mt-5">
                        <Route path="/cources" component={this.withProps(UserCources, { keycloak: this.state.keycloak })} />
                        <Route path="/grades" component={this.withProps(UserGrades, { keycloak: this.state.keycloak })} />
                    </div>
                    )}
                    {this.state.keycloak.hasResourceRole('admin') && (<div className="container mt-5">
                        <Route path="/cources" component={this.withProps(AdminCources, { keycloak: this.state.keycloak })} />
                        <Route path="/students" component={this.withProps(AdminStudents, { keycloak: this.state.keycloak })} />
                    </div>
                    )}

                </div>
            ); else return (<div>Unable to authenticate!</div>);
        }
        return (
            <div className="container mt-5">
                <img src={spinner} alt='Loading...' style={{ width: '150px', margin: 'auto', display: 'block' }} />
            </div>
        );
    }
}

export default App