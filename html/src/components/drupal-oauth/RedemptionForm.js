import React from "react"
import withDrupalOauthConsumer from './withDrupalOauthConsumer';
import { navigate } from 'gatsby';
import { Form } from "react-bootstrap"
class RedemptionForm extends React.Component {
  state = {
    processing: false,
    username: '',
    password: '',
    PackGroup : 0,
    quantity : 0,
    error: '',
    uid: false,
    radios: null,
    input: null,
    show: null,
    field_name: null
  };

  componentDidMount() {
    const data = this.props.data;
    const input = data.products.nodes.map(node => {
      if (!node.field_unique || node.field_unique === null) {
        return {
          'title': node.title,
          'id': node.drupal_internal__nid
        }
      }
      return undefined;
    });
    const filtered = input.filter(function (el) {
      return el !== undefined;
    });
    this.setState({
      "input": filtered
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const {PackGroup} = this.state;
    let dataSend = JSON.stringify({"code": this.props.redem, "idp": PackGroup, "total": 1});
    let sendLocal = {}
    this.state.input.map(product =>{
        if (product.id === PackGroup) {
          sendLocal = product;
        }
        return true;
    })
    try {
      this.setState({
        processing: true
      });
      await this.props.drupalOauthClient.handleSendRedemption(dataSend).then(data => {
        if(data.message){
          this.setState({
            processing: false,
            error: data.message,
          });
        }else{
          navigate(data);
          localStorage.setItem("product-redemption",JSON.stringify(sendLocal))
          this.setState({
            error: ''
          });
        }
        this.setState({
          processing: false
        });
      });

    } catch (err) {
      this.setState({
        processing: false,
        error: err.message,
      });
    }
  };
     handleClose = () => this.setState({show :false});
     handleShow = () => this.setState({show :true});
  render() {
      if(this.state.input !== null){
        let redem = this.props.redem;
        let {PackGroup,input} = this.state
        const { error, processing } = this.state;
        return (
          <>
          <div className="box-zone">
            <form onSubmit={ event => this.handleSubmit(event)}>
              <h2>zona de <span>redención</span></h2>
              <p>"Por favor selecciona el sabor dentro de los productos que tienes disponible"</p>
              <Form.Group controlId="formBasicText">
                <Form.Control type="text" placeholder="Id usuario" name="field_name"  value={redem} readOnly/>
              </Form.Group>
              <Form.Group className="select-button">
              {input.map((d, i) => {
                if (PackGroup === 0) {
                  this.state.PackGroup = d.id;
                  PackGroup = d.id;
                }
                return (
                <Form.Label key={i} className={PackGroup === d.id ? 'checked': ''} htmlFor="PackGroupC" onClick={event =>{
                    this.setState({ 'PackGroup': d.id })
                    }} >
                <div className="text-first">{d.title}</div>
                <Form.Check
                  key={i}
                  value = {d.id}
                  type={`radio`}
                  name="PackGroup"
                  className={PackGroup === d.id ? 'checked': ''}
                  onChange={event =>{
                      this.setState({ [event.target.name]: event.target.value })
                  }}
                  checked={PackGroup === d.id}
                />
                </Form.Label>
                )
              })}
              </Form.Group>
              { error && !processing && <div className="text-error">{error} </div>}
              {processing ?
              <div className="loader">Realizando tú solicitud ...</div>:
              <div className="link button-first">
                <input type="submit" value="Reclamar" onClick={ event => this.handleSubmit(event)} />
              </div>
              }
            </form>
          </div>
            </>
        )
    }else{
      return ('')
    }
  }
}
export default withDrupalOauthConsumer (RedemptionForm);
