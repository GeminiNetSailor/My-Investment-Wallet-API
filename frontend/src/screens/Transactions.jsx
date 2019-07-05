import React, { useState } from "react";
// import PropTypes from 'prop-types';

import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import Buy from "../components/Buy";
import AccountSelect from "../components/AccountSelect";
import SalesEstimator from "../components/SalesEstimator";


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
  },
  inputField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default () => {
  const classes = useStyles();

  const [buy, setBuy] = useState({
    accounts: {
      origin: {
        account: null,
        currency: null
      },
      destination: {
        account: null,
        currency: null
      }
    },
    totalCost: null,
    exchangeRate: null,
    commission: null,
    reciveAmount: null
  });


  return (
    <Grid container spacing={8}>

      <Grid item xs={4}>

        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container>

                <Grid item xs={6}>
                  <Typography variant="h6" gutterBottom>Origen</Typography>
                  <AccountSelect
                    onChange={(account, currency) => {
                      setBuy({
                        ...buy,
                        origin: {
                          account,
                          currency
                        }
                      });
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="h6" gutterBottom>Destino</Typography>
                  <AccountSelect
                    onChange={(account, currency) => {
                      setBuy({
                        ...buy,
                        desntination: {
                          account,
                          currency
                        }
                      });
                    }}
                  />
                </Grid>

              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Buy
                onChange={(totalCost, exchangeRate, commission, reciveAmount) => {
                  setBuy({
                    ...buy,
                    totalCost,
                    exchangeRate,
                    commission,
                    reciveAmount
                  })
                }}
              />
            </Paper>
          </Grid>
        </Grid>

      </Grid>

      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <SalesEstimator
            buy={buy}
          />
        </Paper>
      </Grid>

    </Grid>
  );

}