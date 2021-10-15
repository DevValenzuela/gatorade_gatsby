import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import { navigate } from 'gatsby';
class Scanner extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
      FaceMode: 'enviroment',
      showViewFinder: true
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
    if (data !== undefined){
      localStorage.setItem('redem', data);
      navigate('redemption');
    }


  }
  handleError(err){
    console.error(err)
  }
  render(){
    if(this.props.access){
      return(
        <div className="zone-scanner">
          <div className="box-scanner">
            <QrReader
              delay={this.state.delay}
              facingMode='environment'
              onError={this.handleError}
              onScan={this.handleScan}
              />
            <p>{this.state.result}</p>
          </div>
        </div>
      )
    }else{
      return ('')
    }
  }
}
export default Scanner
