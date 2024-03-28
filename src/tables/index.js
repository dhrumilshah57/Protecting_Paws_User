import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import Box from "../component/box";
import Typography from "../component/typography";

import DashboardLayout from "../component/dashboard/DashboardLayout";
import DashboardNavbar from "../component/navbar";
import DataTable from "../tables/DataTable";

// Data
import animalPhotoData from "../tables/animalPhotosTable";

function Tables() {
  const { columns, rows } = animalPhotoData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Box
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <Typography variant="h6" color="white">
                  Animal Detection Photos
                </Typography>
              </Box>
              <Box pt={3}>
                <DataTable table={{ columns, rows }} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default Tables;
