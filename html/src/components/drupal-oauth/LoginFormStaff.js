import React from 'react';
import withDrupalOauthConsumer from './withDrupalOauthConsumer';
import { Link, navigate } from 'gatsby';
import {Form} from "react-bootstrap"
class LoginFormStaff extends React.Component {
  state = {
    processing: false,
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
    error: null,
  };

  validate = () => {
    let usernameError = "";
    let passwordError = "";

    if (!this.state.username.includes("@", ".")) {
      usernameError = "Correo electronico invalido";
    }
    if (!this.state.password) {
      passwordError = "El campo no puede ser vacio";
    }
    if (usernameError || passwordError) {
      this.setState({usernameError, passwordError});
      return false;
    };
    return true;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const isValide = this.validate();
    if (isValide) {
      this.setState({ processing: true });
      const { username, password } = this.state;

      try {
        await this.props.drupalOauthClient.handleLogin(username, password, '');
        this.setState({ processing: false });
        this.props.updateAuthenticatedUserState(true);
          navigate(`${this.props.r}`)
      } catch(err) {
        this.setState({
          processing: false,
          error: 'No se pudo completar su solicitud de inicio de sesión.',
        });
      }
    }
  };

  render() {
    const { error, processing } = this.state;
    if (this.props.userAuthenticated) {
      navigate(`${this.props.r}`)
    }
    return (
       <>
          { processing ?
            <div>Loading ...</div>
            :
            <form onSubmit={ event => this.handleSubmit(event)}>
              <div className="title-form">
                <h2>login</h2>
              </div>
              <Form.Group controlId="formBasicText">
                <Form.Control type="text" placeholder="Ingresa tú usuario staff" name="username" onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
                <div className="text-error error-authentication">{this.state.usernameError}</div>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" minLength="8" name="password" placeholder="Ingresa tú contraseña" onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
                <div className="text-error error-authentication">{this.state.passwordError}</div>
                { error && <Form.Text>{error} </Form.Text>}
              </Form.Group>
              {/* <Link className="link-text" to="user/recovery">Solicitar nueva contraseña</Link> */}
              <div className="link button-fifth">
               <input type="submit" value="ingresa" onClick={ event => this.handleSubmit(event)} />
              </div>
              <Link className="link-text" to="/user/register">No tienes cuenta</Link>
            </form>
          }
        </>
    );
  }
}

export default withDrupalOauthConsumer(LoginFormStaff);
