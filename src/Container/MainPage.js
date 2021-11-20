import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, TableFooter } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { lightBlue } from "@material-ui/core/colors";
import Grid from "@mui/material/Grid";
import { Typography } from "@material-ui/core";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router";
import CovidAppBar from "../Components/Navbar";



const useStyle = makeStyles((theme) => ({
  table: {
    
  },
  tableContainer: {
    borderRadius: 15,
    maxWidth: 950,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: lightBlue[400],
  },
  countryName: {
    fontWeight: 500,
    fontSize: "16px",
  },
}));

export default function MainPage() {
  const navigate = useNavigate();
  const classes = useStyle();
  const [dt, setDet] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const move = (flag, country, iso2, population, cases, active, recovered, critical, death) => {
    let obj = {
      flag: flag,
      country: country,
      iso2: iso2,
      population: population,
      cases: cases,
      active: active,
      recovered: recovered,
      critical: critical,
      death: death,
    };
    navigate(`/covidchart/${obj.country}`, { state: obj });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const apiHandle = axios.create({
    baseURL: "https://disease.sh/v3/covid-19/countries",
  });
  const getData = () => {
    apiHandle.get("").then((e) => {
      console.log(e.data);
      setDet(e.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <CovidAppBar />
      <Grid container>
        <Grid item lg={2} />
        <Grid item lg={8} sx={{ my: 10 }}>
          <TableContainer
            sx={{ pt: 2 }}
            component={Paper}
            className={classes.tableContainer}
          >
            <Typography variant="h5">
              Covid-19 Live Situation Worldwide
            </Typography>
            <Table
              sx={{ minWidth: 700, overflow: "hidden" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCell} align="left">
                    Country
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="right">
                    ISO2{" "}
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="right">
                    Population
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="right">
                    Cases 
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="right">
                    Recovered
                  </TableCell>
                  <TableCell className={classes.tableHeaderCell} align="right">
                    Deaths 
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dt
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((e, i) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell component="th" scope="row" align="left">
                            <Grid
                              className='tablehead'
                              type= 'button'
                              container
                              onClick={() =>
                                move(
                                  e.countryInfo.flag,
                                  e.country,
                                  e.countryInfo.iso2,
                                  e.population,
                                  e.cases,
                                  e.active,
                                  e.recovered,
                                  e.critical,
                                  e.deaths
                                )
                              }
                            >
                              <Grid item lg={2}>
                                <Avatar
                                  alt={e.name}
                                  src={e.countryInfo.flag}
                                  align="left"
                                />
                              </Grid>
                              <Grid item lg={10} sx={{ pt: 1.5 }}>
                                <Typography
                                  className={classes.countryName}
                                >
                                  {e.country}
                                </Typography>
                              </Grid>
                            </Grid>
                          </TableCell>
                          <TableCell align="right">
                            {e.countryInfo.iso2}
                          </TableCell>
                          <TableCell align="right">{e.population}</TableCell>
                          <TableCell align="right">{e.cases}</TableCell>
                          <TableCell align="right">{e.recovered}</TableCell>
                          <TableCell align="right">{e.deaths}</TableCell>
                        </TableRow>
                      </>
                    );
                  })}
              </TableBody>
              <TableFooter>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 50]}
                  component="div"
                  count={dt.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item lg={2} />
      </Grid>
    </>
  );
}
