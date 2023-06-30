import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { AppWidgetSummary, AppWebsiteVisits, AppCurrentVisits } from '../sections/@dashboard/app';

export default function DashboardAppPage() {
  const theme = useTheme();
  const [pendingApplicationsCount, setPendingApplicationsCount] = useState(0);
  const [AwaitingActionCount, setAwaitingActionCount] = useState(0);


  useEffect(() => {
    const fetchPendingApplicationsCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/dashboard/pending-applications-count');
        const { count } = response.data;
        setPendingApplicationsCount(count);
      } catch (error) {
        console.error('Error fetching pending applications count:', error);
      }
    };

    fetchPendingApplicationsCount();
    const intervalId = setInterval(fetchPendingApplicationsCount, 10000); // Fetch every 10 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);
  useEffect(() => {
    const fetchAwaitingActionCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/dashboard/awaiting-action-count');
        const { count } = response.data;
        setAwaitingActionCount(count);
      } catch (error) {
        console.error('Error fetching awaiting action count:', error);
      }
    };

    fetchAwaitingActionCount();
    const intervalId = setInterval(fetchAwaitingActionCount, 10000); // Fetch every 10 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, []);


  return (
    <>
      <Helmet>
        <title>ZICTA USSD ADMIN Dashboard</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome to the ZICTA USSD Admin dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Applications" total={pendingApplicationsCount} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Applications awaiting Action"
              total={AwaitingActionCount}
              color="info"
              icon={'ant-design:apple-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Expiring USSD's" total={23} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Average Response Time" total={1} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Activity"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'USSD Searches',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'USSD Applications',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'USSD Licenses',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current USSD codes"
              chartData={[
                { label: 'Applied', value: 4344 },
                { label: 'Active', value: 5435 },
                { label: 'Expiring Soon', value: 1443 },
                { label: 'Expired', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
