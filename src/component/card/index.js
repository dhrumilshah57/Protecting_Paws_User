import { useMemo } from "react";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import VideoModal from "VideoModal";
// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Box from "../box";
import Typography from "../typography";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function CameraCard({ color, title, description, date, chart }) {
  return (
    <Card sx={{ height: "100%" }}>
      <Box padding="1rem">
        {useMemo(
          () => (
            <Box
              variant="gradient"
              bgColor={color}
              borderRadius="lg"
              coloredShadow={color}
              py={2}
              pr={0.5}
              mt={-5}
              height="12.5rem"
            >
              <VideoModal
                videoBase64={
                  "D:\\React\\material-dashboard-react-main\\src\\assets\\images\\demo.mp4"
                }
              />
            </Box>
          ),
          [color, chart]
        )}
        <Box pt={3} pb={1} px={1}>
          <Typography variant="h6" textTransform="capitalize">
            {title}
          </Typography>
          <Typography component="div" variant="button" color="text" fontWeight="light">
            {description}
          </Typography>
          <Divider />
        </Box>
      </Box>
    </Card>
  );
}

// Setting default values for the props of ReportsBarChart
CameraCard.defaultProps = {
  color: "info",
  description: "",
};

// Typechecking props for the ReportsBarChart
CameraCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default CameraCard;
