import React from 'react';
import withDrupalOauthConsumer from './withDrupalOauthConsumer';
import { Link } from "gatsby";
import { navigate } from 'gatsby';
import { Form } from "react-bootstrap"
class RegisterForm extends React.Component {
  state = {
    processing: false,
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
    passwordConfirmError: '',
    field_name: '',
    field_nameError: '',
    field_lastname: '',
    field_lastnameError: '',
    modality: '',
    modalityError: '',
    birthdate: '',
    birthdateError: '',
    phone: '',
    phoneError: '',
    error: null,
    code: null
  };

  validate = () => {
    let usernameError = "";
    let field_nameError = "";
    let field_lastnameError = "";
    let passwordError = "";
    let passwordConfirmError= "";
    let birthdateError = "";
    let phoneError = "";
    let modalityError = "";
    let match = "";
    if (!this.state.username.includes("@", ".")) {
      usernameError = "Correo electronico invalido";
    }
    if (!this.state.field_name) {
      field_nameError = "Campo obligatorio";
    }
     match = /^[a-zA-Z ]+$/;
    if (field_nameError === "" && !match.exec(this.state.field_name)) {
      field_nameError = "El campo debe contener solo Letras";
    }
    if (!this.state.field_lastname) {
      field_lastnameError = "Campo obligatorio";
    }
    if (field_lastnameError === "" && !match.exec(this.state.field_lastname)) {
      field_lastnameError = "El campo debe contener solo Letras";
    }
    if (!this.state.birthdate ) {
      birthdateError = "Campo obligatorio";
    }
    if (!this.state.modality || this.state.modality === '') {
      modalityError = "Campo obligatorio";
    }
    if (!this.state.phone || (this.state.phone.length < 7 || this.state.phone.length > 10)) {
      phoneError = "Debes ingresar un número de telefono fijo o celular";
    }
     match = /^[0-9]*$/;
    if (phoneError === "" && !match.exec(this.state.phone)) {
      phoneError = "El campo debe contener solo Números";
    }
    if (!this.state.password) {
      passwordError = "El campo no puede ser vacio";
    }
    if (!this.state.repeat_password) {
      passwordConfirmError = "El campo no puede ser vacio";
    }
    if (this.state.password !== this.state.repeat_password && passwordConfirmError === '') {
      passwordConfirmError = "Las contraseñas son diferentes";
    }
    if (passwordError === '' && this.state.password.length < 8) {
        passwordError = "El campo debe tener minímo 8 caracteres";
    }
    if (passwordConfirmError === '' && this.state.repeat_password.length < 8) {
      passwordConfirmError = "El campo debe tener minímo 8 caracteres";
    }
     match = /[A-Z]/;
    if (passwordError === "" && !match.exec(this.state.password)) {
      passwordError = "El campo debe tener al menos una mayúscula";
    }
     match = /[a-z]/;
    if (passwordError === "" && !match.exec(this.state.password)) {
      passwordError = "El campo debe tener al menos una minuscula";
    }
     match = /[^a-zA-Z]/;
    if (passwordError === "" && !match.exec(this.state.password)) {
      passwordError = "El campo debe tener al menos un caracter Especial";
    }
    if (usernameError || field_nameError || field_lastnameError || birthdateError || phoneError || passwordError || passwordConfirmError || modalityError) {
      this.setState({usernameError, field_nameError, field_lastnameError, birthdateError, phoneError, modalityError, passwordError, passwordConfirmError});
      return false;
    };
    return true;
   };

  handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const code = this.props.code;
      const { field_name, field_lastname, birthdate, username, modality, phone, password } = this.state;
      try {
          const oauth = await this.props.drupalOauthClient.handleRegister(field_name.toUpperCase(), field_lastname.toUpperCase(), birthdate, username.toUpperCase(), modality, phone, password, 'cliente', code);
        this.setState({ processing: false });
        this.setState({usernameError: true, field_nameError: true, field_lastnameError: true, birthdateError: true, phoneError: true, modalityError: true, passwordError: true, passwordConfirmError:true});
        if (oauth.error){
          this.setState({
            processing: false,
            error: 'Tu usuario ya existe o no tenemos códigos QR para asignarte',
          });
        }else{
          this.setState({error: 'Te hemos enviado un correo eléctronico por favor confirmalo'});
        }
      } catch(err) {

      }
    }
  };
  pad(n){return n<10 ? '0'+n : n}
  onKeyPressed(e) {
    if (!(e.keyCode >= 48 && e.keyCode <= 57) && e.keyCode !== 91 && e.keyCode !== 92 && e.keyCode !== 8 && e.keyCode !== 32 && e.keyCode !== 9) { //13 is the key code for Enter
      e.preventDefault()
      //Here you can even write the logic to select the value from the drop down or something.
    }
  }
  onKeyPressedLetters(e) {
     if (!(e.keyCode >= 65 && e.keyCode <= 120) && e.keyCode !== 91 && e.keyCode !== 92 && e.keyCode !== 8 && e.keyCode !== 32 && e.keyCode !== 9 && e.keyCode !== 0) {
       e.preventDefault();
     }
  }
  //   if (e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode === 91 || e.keyCode === 92 || e.keyCode === 8 || e.keyCode === 32) { //13 is the key code for Enter
  //     return true;
  //   }
  //   e.preventDefault()
  // }
  render() {
    const {processing } = this.state;
    const today = new Date()
    if (this.props.userAuthenticated){
      navigate("/user/profile");
      return('');
    }else{
      return (
        <>
          { processing ?
            <div>Loading ...</div>
            :<>
            <form onSubmit={ event => this.handleSubmit(event)}>
              <Form.Group controlId="formBasicTextName">
                <Form.Control
                type="text"
                placeholder="nombres"
                name="field_name"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }
                onKeyDown = {this.onKeyPressedLetters}
                />
                <div className="text-error" >{this.state.field_nameError}</div>
              </Form.Group>
              <Form.Group controlId="formBasicTextLastName">
                <Form.Control
                type="text"
                placeholder="apellidos"
                name="field_lastname"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }
                onKeyDown = {this.onKeyPressedLetters}/>
                <div className="text-error" >{this.state.field_lastnameError}</div>
              </Form.Group>
              <Form.Group controlId="formBasicBirthdate">
                <Form.Control
                type="date"
                placeholder="fecha de nacimiento"
                format="DD-MM-YYYY"
                min = '1900-01-01'
                max = {
                  `${today.getFullYear()-18}-${(this.pad(today.getMonth()+1))}-${(this.pad(today.getDate()))}`
                }
                name="birthdate"
                onKeyDown={event =>{
                  event.target.classList.add("not-empty");
                }}
                onChange={event =>{
                  event.target.classList.add("not-empty");
                  this.setState({
                    [event.target.name]: event.target.value
                  })
                }

                }/>
                <div className="text-error" >{this.state.birthdateError}</div>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                type="email"
                placeholder="correo"
                name="username"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
                <div className="text-error" >{this.state.usernameError}</div>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                as="select"
                name="modality"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }>
                  <option value="" >MODALIDAD DE CICLISMO</option>
                  <option value="ruta">Ruta</option>
                  <option value ="montaña">Montaña</option>
                  <option value="bmx">Bmx</option>
                </Form.Control>
                <div className="text-error" >{this.state.modalityError}</div>
              </Form.Group>
              <Form.Group controlId="formBasicDate">
                <Form.Control
                type="number"
                placeholder="teléfono"
                name="phone"
                pattern = "[0-9]*"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }
                onKeyDown = {this.onKeyPressed}
                />
                <div className="text-error" >{this.state.phoneError}</div>
              </Form.Group>
              <h3>elige<br/><span>una contraseña</span></h3>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                type="password"
                minLength= "8"
                name="password"
                autoComplete = "off"
                placeholder="contraseña"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })
                }/>
                <div className="text-error" >{this.state.passwordError}</div>
              </Form.Group>
              <Form.Group controlId="formBasicRepeatPassword">
                <Form.Control
                type="password"
                name="repeat_password"
                autoComplete = "off"
                placeholder="repetir contraseña"
                onChange={event =>
                  this.setState({ [event.target.name]: event.target.value })}
                  />
                 <div className="text-error" >{this.state.passwordConfirmError}</div>
              </Form.Group>
              { this.state.error && <p className="text-success" >{this.state.error} </p>}
              <Link to="/user/login"> ¿ya tienes cuenta?</Link>
              <div className="link button-first">
                <input type="submit" value="Registrate" onClick={ event => this.handleSubmit(event)} />
              </div>
            </form></>
          }
        </>
      );
    }
  }
}

export default withDrupalOauthConsumer(RegisterForm);
