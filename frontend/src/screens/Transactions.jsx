import React, { useState } from "react";
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import { Grid, Paper, Typography } from "@material-ui/core";
import Buy from "../components/Buy";
import AccountSelect from "../components/AccountSelect";
import SalesEstimator from "../components/SalesEstimator";
import { makeStyles } from '@material-ui/core/styles';

const round = (value, decimals) => Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default () => {
  // Account - Cuenta
  // Wallet - Cartera
  const classes = useStyles();

  const [accounts, setAccounts] = useState();

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
    comission: null,
    reciveAmount: null
  });

  return (
    <>
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
                  onChange={(totalCost, exchangeRate, comission, reciveAmount) => {
                    setBuy({
                      ...buy,
                      totalCost,
                      exchangeRate,
                      comission,
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
    </>
  );

}