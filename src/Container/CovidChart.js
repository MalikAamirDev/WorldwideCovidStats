import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import { Avatar } from "@material-ui/core";
import { Pie } from "react-chartjs-2";
import CovidAppBar from "../Components/Navbar";



export default function CovidChart() {
  const [totalCases, setTotalCases] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);

  const perams = useParams();
  const location = useLocation();
  const {
    country,
    flag,
    population,
    cases,
    active,
    recovered,
    critical,
    death,
  } = location.state;

  console.log(location.state);
  console.log(perams);

  const data = (canvas) => {
    const color = "#FFB4B1";
    const color1 = "#BCE5BA";
    const color2 = "#ABE9ED";

    return {
      labels: ["Cases", "Recovered", "Deaths"],
      datasets: [
        {
          label: "Data",
          data: [totalCases, totalRecovered, totalDeaths],
          backgroundColor: [color2, color1, color],
          // borderColor: [gradient2, gradient1, gradient],
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f}%",
      },
    },
  };

  const getChartData = async () => {
    try {
      let casesData = 0;
      let recoveredData = 0;
      let deathsdata = 0;
      // const response = await getPieData();

      // const { cases, deaths, recovered } = response;x
      const total = cases + death + recovered;
      casesData = parseFloat(((cases / total) * 100).toFixed(2));
      recoveredData = parseFloat(((recovered / total) * 100).toFixed(2));
      deathsdata = parseFloat(((death / total) * 100).toFixed(2));

      setTotalCases(casesData);
      setTotalRecovered(recoveredData);
      setTotalDeaths(deathsdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <>
    <CovidAppBar />
      <Box sx={{ mx: 1, my: 1 }}>
        <Grid container>
          <Grid item xs={0} sm={1} lg={1} />
          <Grid item lg={10}>
            {/* <Typography variant="h3" color="initial">
              Live 
            </Typography> */}
            {/* Title & Flag */}
            <Grid
              container
              sx={{ pt: 10, justifyContent: "center", textAlign: "center" }}
            >
              <Grid item>
                <img src={flag} height="50" className="countryFlag" />
              </Grid>
              <Grid item>
                <Typography
                  variant="h4"
                  color="initial"
                  sx={{
                    pt: 0.5,
                    pb: 3,
                    px: 1,
                    fontWeight: "bold",
                    fontSize: "2.5em",
                  }}
                >
                  {country} Statistics
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Cards */}
          <Grid container spacing={0}>
            <Grid item lg={1} />
            <Grid
              item
              lg={10}
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
            >
              {/* Confirmed Casses */}
              <Paper
                className="confirmedCases"
                sx={{
                  height: 115,
                  width: 200,
                  px: 2,
                  py: 2,
                  mb: 3,
                  borderRadius: "10px",
                  backgroundColor: '#ABE9ED',
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "28px",
                      fontWeight: "normal",
                      lineHeight: "28px",
                    }}
                  >
                    Confirmed Cases
                  </Typography>
                  <Avatar
                    alt={country}
                    variant="square"
                    src="https://covid.gov.pk/assets/img/diagnosed-cases.png?v1.0"
                  />
                </Box>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", fontWeight: "bold", pt: 3 }}
                >
                  {cases}
                </Typography>
              </Paper>
              {/* Deaths */}
              <Paper
                className="deathCases"
                sx={{
                  height: 115,
                  width: 200,
                  px: 2,
                  py: 2,
                  mb: 3,
                  borderRadius: "10px",
                  backgroundColor: '#FFB4B1'
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "28px",
                      fontWeight: "normal",
                      lineHeight: "28px",
                    }}
                  >
                    Deaths
                  </Typography>
                  <Avatar
                    alt={death}
                    variant="square"
                    src="https://covid.gov.pk/assets/img/deaths.png?v1.0"
                  />
                </Box>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", fontWeight: "bold", pt: 5 }}
                >
                  {death}
                </Typography>
              </Paper>
              {/* Recovered */}
              <Paper
                className="recoverdCases"
                sx={{
                  height: 115,
                  width: 200,
                  px: 2,
                  py: 2,
                  mb: 3,
                  borderRadius: "10px",
                  backgroundColor: '#BCE5BA'
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "28px",
                      fontWeight: "normal",
                      lineHeight: "28px",
                      // mr: 3,
                    }}
                  >
                    Recovered
                  </Typography>
                  <Avatar
                    alt={recovered}
                    variant="square"
                    src="https://covid.gov.pk/assets/img/recovered.png?v1.0"
                  />
                </Box>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", fontWeight: "bold", pt: 5 }}
                >
                  {recovered}
                </Typography>
              </Paper>
              {/* Active */}
              <Paper
                className="activeCases"
                sx={{
                  height: 115,
                  width: 200,
                  px: 2,
                  py: 2,
                  mb: 3,
                  borderRadius: "10px",
                  backgroundColor: '#E2F2F9'
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "28px",
                      fontWeight: "normal",
                      lineHeight: "28px",
                      // mr: 3,
                    }}
                  >
                    Active
                  </Typography>
                  <Avatar
                    alt={active}
                    variant="square"
                    src="https://covid.gov.pk/assets/img/active-cases.png?v1.0"
                  />
                </Box>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", fontWeight: "bold", pt: 5 }}
                >
                  {active}
                </Typography>
              </Paper>
              {/* Critical */}
              <Paper
                className="crititalCases"
                sx={{
                  height: 115,
                  width: 200,
                  px: 2,
                  py: 2,
                  mb: 3,
                  borderRadius: "10px",
                  backgroundColor: '#F3D9BE'
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "28px",
                      fontWeight: "normal",
                      lineHeight: "28px",
                      // mr: 3,
                    }}
                  >
                    Critical
                  </Typography>
                  <Avatar
                    alt={critical}
                    variant="square"
                    src="https://covid.gov.pk/assets/img/critical.png"
                  />
                </Box>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", fontWeight: "bold", pt: 5 }}
                >
                  {critical}
                </Typography>
              </Paper>
            </Grid>
            <Grid item lg={1} />
          </Grid>

          <Grid item xs={0} sm={1} lg={1} />
        </Grid>
      </Box>

      {/* Pie Chart */}
      <Grid container spacing={0}>
        <Grid item sm={0} xs={0} lg={4} md={4} xl={4} />
        <Grid item sm={12} xs={12} lg={4} md={4} xl={4}>
          <Box className="ChartMainBox">
            <div>
              <h1 className="ChartTitle">Covid-19 Status in {country} </h1>
            </div>
            <Pie data={data} options={options} />
          </Box>
        </Grid>
        <Grid item sm={0} xs={0} lg={4} md={4} xl={4} />
      </Grid>
    </>
  );
}
