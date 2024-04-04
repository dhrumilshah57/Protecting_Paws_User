import Grid from "@mui/material/Grid";
import Box from "../../component/box";
import DashboardLayout from "../dashboard/DashboardLayout";
import DashboardNavbar from "../../component/navbar";
import CameraCard from "../../component/card";
import CountCard from "../../component/countCard/index";

// Dashboard components
import S3 from "react-aws-s3-typescript";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  // State variable to store count of items
  const [count, setCount] = useState([]);
  // Function to fetch count of items from AWS S3 bucket
  const fetchCount = () => {
    // Initializing AWS S3 client with credentials and bucket details
    const ReactS3Client = new S3({
      accessKeyId: "AKIA5FTZBV5V5QLBMG7W",
      secretAccessKey: "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",
      bucketName: "animalpicsdata",
      region: "us-east-2",
      s3Url: "https://animalpicsdata.s3.us-east-2.amazonaws.com",
    });
    // Fetching list of files from S3 bucket
    ReactS3Client.listFiles()
      .then((data) => {
        // Filtering items to get count of animal detection files
        const filteredItems = data.data.Contents.filter((item) =>
          item.Key.startsWith("animal_detection")
        );
        // Setting count of items

        setCount(filteredItems.length);
        console.log(filteredItems);
      })
      .catch((err) => console.error(err));
  };
  // useEffect hook to execute fetchCount function when component mounts
  useEffect(() => {
    fetchCount(); // Fetch images when component mounts
  }, []); // Empty dependency array ensures the effect runs only once, when the component mounts
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <CountCard color="dark" icon="videocam" title="Camera Counts" count={2} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Box mb={1.5}>
              <Link to={`${location.origin}/Images`}>
                <CountCard icon="pets" title="Total Count" count={count} />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Box mb={3}>
                <CameraCard title="Camera 1" description="Live Feed from camera 1" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box mb={3}>
                <CameraCard title="Camera 2" description="Live Feed from camera 2" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </DashboardLayout>
  );
}

export default Dashboard;
