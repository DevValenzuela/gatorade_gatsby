import React from 'react';
import withDrupalOauthConsumer from './withDrupalOauthConsumer';
import { Link, navigate } from 'gatsby';
import {Form} from "react-bootstrap"
class ChangePasswordForm extends React.Component {
  state = {
    processing: false,
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
    passwordConfirmError: '',
    error: null,
  };

  validate = () => {
    let passwordConfirmError = "";
    let passwordError = "";
    let match = "";
    if (!this.state.password) {
      passwordError = "El campo no puede ser vacio";
    }
    if (!this.state.new_password) {
      passwordConfirmError = "El campo no puede ser vacio";
    }
    if (this.state.password !== this.state.new_password && passwordConfirmError === '') {
      passwordConfirmError = "Las contraseñas son diferentes";
    }
    if (passwordError === '' && this.state.password.length < 8) {
        passwordError = "El campo debe tener minímo 8 caracteres";
    }
    if (passwordConfirmError === '' && this.state.new_password.length < 8) {
      passwordConfirmError = "El campo debe tener minímo 8 caracteres";
    }
    match = /^[A-Z]/;
    if (passwordError === "" && !match.exec(this.state.password)) {
      passwordError = "El campo debe al menos una mayúscula";
    }
    match = /[a-z]/;
    if (passwordError === "" && !match.exec(this.state.password)) {
      passwordError = "El campo debe al menos una minuscula";
    }
    match = /[^a-zA-Z]/;
    if (passwordError === "" && !match.exec(this.state.password)) {
      passwordError = "El campo debe al menos un caracter Especial";
    }
    if (passwordConfirmError || passwordError) {
      this.setState({passwordConfirmError, passwordError});
      return false;
    };
    return true;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState({ processing: true });
      const { password } = this.state;
      const {recovery} = this.props;
      try {
        await this.props.drupalOauthClient.handleChangePassword(recovery,password).then(receive => receive)
          .then(json => {
            if (json.message === undefined) {
              this.setState({ processing: false });
              this.setState({
                processing: false,
                error: 'Hemos cambiado tú contraseña, por favor intenta ingresar a tú cuenta {<a href="/user/login"> aquí</a>}',
              });
              // this.props.updateAuthenticatedUserState(true);
                // navigate(`${this.props.r}`)
            }else{
              this.setState({
                processing: false,
                error: json.message,
              });
            }
          });
      } catch(err) {
        this.setState({
          processing: false,
          error: 'No se pudo completar su solicitud de nueva contraseña.',
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
            :<>
            <form onSubmit={ event => this.handleSubmit(event)}>
              <div className="title-form">
                <h2>Recuperar contraseña</h2>
              </div>
              <Form.Group className={ error ? 'error' : ''} controlId="formBasicText">
                <Form.Group controlId="formBasicPassword-one">
                  <Form.Control type="password" minLength="8" name="password" placeholder="Nueva contraseña" onChange={event =>
                    this.setState({ [event.target.name]: event.target.value })
                  } autoComplete="off"/>
                  <div className="text-error error-authentication">{this.state.passwordError}</div>
                </Form.Group>
                <Form.Group controlId="formBasicPassword-two">
                  <Form.Control type="password" name="new_password" placeholder="Confirmar contraseña" onChange={event =>
                    this.setState({ [event.target.name]: event.target.value })
                  } autoComplete="off"/>
                </Form.Group>
                <div className="text-error error-authentication">{this.state.passwordConfirmError}</div>
              </Form.Group>
              <Link className="link-text" to="/user/login">¿Tienes Cuenta?</Link>
              { error && <p className="text-error" >{error} </p>}
              <div className="link button-fifth">
               <input type="submit" value="ingresa" onClick={ event => this.handleSubmit(event)} />
              </div>
              <Link className="link-text" to="/user/register">No tienes cuenta</Link>
            </form></>
          }
        </>
    );
  }
}

export default withDrupalOauthConsumer(ChangePasswordForm);
