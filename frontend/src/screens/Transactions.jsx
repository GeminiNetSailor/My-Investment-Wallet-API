import React, { useState } from "react";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import { Grid, Paper, Typography } from "@material-ui/core";
import Buy from "../components/Buy";
import AccountSelect from "../components/AccountSelect";
import SalesEstimator from "../components/SalesEstimator";
import { makeStyles } from '@material-ui/core/styles';

const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];



const round = (value, decimals) => Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

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

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

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

  /*
  * Buy
  */

  // const buySubTotal = round(buyAmount / exchangeRate, 6);

  // const buyComisionFrom = round(buyAmount * commissionBuy, 4);
  // const buyComisionTo = round(buySubTotal * commissionBuy, 6);

  // const buyTotalFrom = round(buyAmount - buyComisionFrom, 4);
  // const buyTotalTo = round(buySubTotal - buyComisionTo, 6);

  // /*
  // * Estimate Sell
  // */
  // const sellSubTotalFrom = round((buyAmount + estimateProfitOrigin) * (commissionSell + 1), 4)

  // const estimateSellExchangeRate = round(sellSubTotalFrom / buyTotalTo, 4);
  // const exchangeRateDiference = round(estimateSellExchangeRate - exchangeRate, 4);

  // const sellSubTotalTo = round(sellSubTotalFrom / estimateSellExchangeRate, 6);

  // const sellComisionFrom = round(sellSubTotalFrom * commissionSell, 4);
  // const sellComisionTo = round(sellComisionFrom / estimateSellExchangeRate, 6);

  // const sellTotalTo = round(sellSubTotalTo - sellComisionTo, 6);
  // const sellTotalFrom = round(sellTotalTo * estimateSellExchangeRate, 4);

  // /*
  // * Buy To Sell Compare
  // */

  // const exchangeRateDiferencePorcentage = round(((estimateSellExchangeRate - exchangeRate) / exchangeRate) * 100, 4);
  // const profitFrom = round(sellTotalFrom - buyAmount, 4);
  // const profitFromPorcentage = round(((sellTotalFrom - buyAmount) / buyAmount) * 100, 4);

  return (
    <>
      <Grid container spacing={8}>
        <Grid item xs={4}>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Paper className={classes.root}>
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
              <Paper>
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
          <Paper>
            <SalesEstimator
              buy={buy}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );

}