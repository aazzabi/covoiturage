import React from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeAlert } from '../actions/AlertActions'


export const ReactBSAlertLayout = ({ alerts, removeAlert }) => {
  return (
    <ReactBSAlert
      custom
      style={{ display: "block", marginTop: "-100px" }}
      title="Question"
      customIcon={
        <div
          className="swal2-icon swal2-question swal2-animate-question-icon"
          style={{ display: "flex" }}
        >
          <span className="swal2-icon-text">?</span>
        </div>
      }
      onConfirm={() => (this.props.removeAlert())}
      onCancel={() => this.hideAlert()}
      confirmBtnBsStyle="default"
      confirmBtnText="Ok"
      btnSize=""
    >
      A few words about this sweet alert ...
    </ReactBSAlert>
  );
};

ReactBSAlertLayout.propTypes = {
  alerts: PropTypes.array.isRequired, 
  removeAlert : PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps, {removeAlert})(ReactBSAlertLayout);
