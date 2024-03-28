import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Fade from "@mui/material/Fade";

// Material Dashboard 2 React components
import Box from "../box";

// Custom styles for the MDAlert
import AlertRoot from "../alert/AlertRoot";
import MDAlertCloseIcon from "../alert/CloseIcon";

function AlertModel({ color, dismissible, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <AlertRoot ownerState={{ color }} {...rest}>
        <Box display="flex" alignItems="center" color="white">
          {children}
        </Box>
        {dismissible ? (
          <MDAlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</MDAlertCloseIcon>
        ) : null}
      </AlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Setting default values for the props of MDAlert
AlertModel.defaultProps = {
  color: "info",
  dismissible: false,
};

// Typechecking props of the MDAlert
AlertModel.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default AlertModel;
