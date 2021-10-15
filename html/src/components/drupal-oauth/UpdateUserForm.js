import React from 'react';
import withDrupalOauthConsumer from './withDrupalOauthConsumer';
import { navigate } from 'gatsby';
import { Form } from "react-bootstrap"
class UpdateUserForm extends React.Component {
  state = {
    processing: false,
    username: '',
    password: '',
    error: null,
    uid: false,
    modality: '',
    birthdate: ''
  };
  componentDidMount() {
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ processing: true });
    const { field_name, field_lastname, birthdate, username, modality, phone, password, new_password } = this.state;
    try {
      await this.props.drupalOauthClient.handleUpdateRegister(field_name, field_lastname, birthdate, username, modality, phone, password, new_password);
      this.setState({ processing: true });
      navigate("/");
    } catch(err) {
      this.setState({
        processing: false,
        error: err.message,
      });
    }
  };

  render() {
    const data = this.props.data
    const { processing } = this.state;
    return (
      <>
        <div className="lateral-left">
          <h2 className="text-lateral-update">mis datos</h2>
        </div>
        <div className="container-right">
          <div className="containers-form">
            {processing ?
              <div>Loading ...</div>
              :
              <form onSubmit={event => this.handleSubmit(event)}>
                <div className="container-one">
                  <Form.Group controlId="formBasicText-one">
                    <Form.Control type="text" defaultValue={data.field_name} placeholder="nombres" name="field_name" onChange={event =>
                      this.setState({ [event.target.name]: event.target.value })
                      } />
                  </Form.Group>
                  <Form.Group controlId="formBasicText-two">
                    <Form.Control type="text" defaultValue={data.field_lastname} placeholder="apellidos" name="field_lastname" onChange={event =>
                      this.setState({ [event.target.name]: event.target.value })
                    } />
                  </Form.Group>
                  <Form.Group controlId="formBasicDate-one">
                    < Form.Control type = "date"
                    value = {
                      this.state.birthdate === '' && data.field_born_date  != null ? data.field_born_date : ''
                    }
                    placeholder = "fecha de nacimiento"
                    format = "YYYY-MM-DD"
                    name = "birthdate"
                    onChange = {
                        event =>
                      this.setState({ [event.target.name]: event.target.value })
                    } readOnly />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" defaultValue={data.display_name} placeholder="correo" name="username"
                      onChange={event =>
                        this.setState({ [event.target.name]: event.target.value })
                      } readOnly />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    < Form.Control defaultValue = {
                      this.value
                    }
                    as = "select"
                    name = "modality"
                    value = {
                      this.state.modality === '' ? data.field_bike_type :''}
                    onChange = {
                        event =>
                      this.setState({ [event.target.name]: event.target.value })
                    }>
                      <option value="">MODALIDAD DE CICLISMO</option>
                      <option value="ruta" >Ruta</option>
                      <option value="montaña">Montaña</option>
                      <option value="bmx">Bmx</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formBasicDate-two">
                    <Form.Control type="tel" defaultValue={data.field_phone === 'null' ? '' : data.field_phone} placeholder="teléfono" name="phone" onChange={event =>
                      this.setState({ [event.target.name]: event.target.value })
                    } />
                  </Form.Group>
                </div>
                <div className="container-two">
                <h3>Cambio de contraseña</h3>
                  <div className="form">
                    <Form.Group controlId="formBasicPassword-one">
                      <Form.Control type="password" minLength="8" name="password" placeholder="Contraseña Actual" onChange={event =>
                        this.setState({ [event.target.name]: event.target.value })
                      } autoComplete="off"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword-two">
                      <Form.Control type="password" name="new_password" placeholder="Nueva contraseña" onChange={event =>
                        this.setState({ [event.target.name]: event.target.value })
                      } autoComplete="off"/>
                    </Form.Group>
                  </div>
                </div>
                <div className="link button-fifth">
                  <input type="submit" value="Actualizar" onClick={event => this.handleSubmit(event)} />
                </div>
              </form>
            }
          </div>
        </div>
      </>
    );

  }
}
export default withDrupalOauthConsumer (UpdateUserForm);
