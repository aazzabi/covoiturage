import React, { Fragment } from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";

export const NotificationAlertOptions = (type, title, message) => {
  var options = {};
  options = {
    place: "tl",
    message: (
      <div>
        <div>
          <b>{title}</b> - {message}.
        </div>
      </div>
    ),
    type: type,
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 7
  };
  return options;
};

export const ReactBSAlertOptions = () => {
 
    return (<ReactBSAlert
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
      onConfirm={() => this.hideAlert()}
      onCancel={() => this.hideAlert()}
      confirmBtnBsStyle="default"
      confirmBtnText="Ok"
      btnSize=""
    >
      A few words about this sweet alert ...
    </ReactBSAlert>)
      
    
  
};

export default [NotificationAlertOptions, ReactBSAlertOptions];
