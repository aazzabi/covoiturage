import React from "react";

import {connect} from 'react-redux'
import {setAlert} from '../../../actions/AlertActions'
import PropTypes from "prop-types";
import { ReactBSAlertLayout } from "../../../layouts/ReactBSAlertLayout";

class SiteSelector extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        password: "Netcapital2020"
      }
    };
    this.appelFuntion = this.appelFuntion.bind(this);
  }

   appelFuntion= ()=>{
    console.log("heeyyyyy 55")
    this.props.setAlert("msg", "msg "); 
  }

  componentDidMount(){
    
  }

  render() {
    return <>
    
    <ReactBSAlertLayout/>
    <button onClick={this.appelFuntion}> click me</button>
    Site Selector</>;
  }
  
}
SiteSelector.propTypes = {
  setAlert: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  alert: state.alert
});
export default connect(mapStateToProps, {setAlert}) (SiteSelector);
