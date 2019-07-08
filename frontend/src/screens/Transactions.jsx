import React, { useState } from "react";
// import PropTypes from 'prop-types';

import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import Buy from "../components/Buy";
import AccountSelect from "../components/AccountSelect";
import SalesEstimator from "../components/SalesEstimator";
import CurrenciesTypes from "../services/currencyTypes";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
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

  const [transaction, setTransaction] = useState({
    id: null,
    subTotal: null,
    total: null,
    exchangeRate: null,
    receivedType: null,
    receivedAmount: null,
    commission: null,
    accounts: {
      from: {
        account: null,
        currency: null
      },
      to: {
        account: null,
        currency: null
      }
    }
  });

  const [estimate, setEstimate] = useState({
    transactionId: null,
    subTotal: null,
    total: null,
    exchangeRate: null,
    receivedType: null,
    receivedAmount: null,
    commission: null,
    accounts: {
      from: {
        account: null,
        currency: null
      },
      to: {
        account: null,
        currency: null
      }
    }
  });

  const handleSave = event => {
    event.preventDefault();
    const currenciesTypes = new CurrenciesTypes();
    const test = currenciesTypes.find();
    console.log(test);
  }

  const handleSaveTransaction = () => {

  }

  const handleSaveEstimate = () => {

  }

  return (
    <Grid container className={classes.root} spacing={8}>

      <Grid item md={4}>

        <Grid container spacing={8}>
          <Grid item md={12}>
            <Paper className={classes.paper}>
              <Grid container>

                <Grid item md={6}>
                  <Typography variant="h6" gutterBottom>Origen</Typography>
                  <AccountSelect
                    onChange={(account, currency) => {
                      setTransaction({
                        ...transaction,
                        account: {
                          account,
                          currency
                        }
                      });
                    }}
                  />
                </Grid>

                <Grid item md={6}>
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
          <Grid item md={12}>
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

      <Grid item md={8}>
        <Paper className={classes.paper}>
          <SalesEstimator
            buy={buy}
          />
        </Paper>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleSave}>
        Guardar
      </Button>
    </Grid>
  );

}