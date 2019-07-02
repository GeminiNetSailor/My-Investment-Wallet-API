import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import { Grid, Typography } from "@material-ui/core";
import { CurrencyFormat, DecimalFormat } from "./helpers/NumbersFormaters";
import NumberFormat from 'react-number-format';
// import { makeStyles } from '@material-ui/core/styles';

const round = (value, decimals) => Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

// const useStyles = makeStyles(theme => ({
//   paper: {
//     padding: theme.spacing(3, 2),
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   }
// }));

export default props => {
  // const classes = useStyles();
  const [buyAmount, setBuyAmount] = useState(10000);
  const [exchangeRate, setExchangeRate] = useState(190999.99);
  const [commissionBuy, setCommissionBuy] = useState(0.005);

  const subTotal = round(buyAmount / exchangeRate, 6);

  const comisionFrom = round(buyAmount * commissionBuy, 6);
  const comisionTo = round(subTotal * commissionBuy, 6);

  const totalFrom = round(buyAmount - comisionFrom, 4);
  const totalTo = round(subTotal - comisionTo, 6);
  
  useEffect(() => {
      props.onChange(
        buyAmount,
        exchangeRate,
        commissionBuy,
        totalTo
      )
    // eslint-disable-next-line
    }, [buyAmount, exchangeRate, commissionBuy, totalTo]);

  return (
    <Grid container>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>Buy</Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          label="Monto"
          value={buyAmount}
          onChange={e => setBuyAmount(Number(e.target.value))}
          InputProps={{
            inputComponent: CurrencyFormat,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          label="Precio / Tipo de Cambio"
          value={exchangeRate}
          onChange={e => setExchangeRate(Number(e.target.value))}
          InputProps={{
            inputComponent: DecimalFormat,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          label="Buy Comision"
          value={commissionBuy}
          onChange={e => setCommissionBuy(Number(e.target.value))}
          InputProps={{
            inputComponent: DecimalFormat,
          }}
        />
      </Grid>
      <Grid item container xs={12} sm={12}>
        <Grid item xs={6}>
          <Typography gutterBottom>SubTotal</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>
            <NumberFormat value={subTotal} displayType={'text'} thousandSeparator={true} prefix={'BTC '} /> | <NumberFormat value={buyAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>Comision</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>
            <NumberFormat value={comisionTo} displayType={'text'} thousandSeparator={true} prefix={'BTC '} /> | <NumberFormat value={comisionFrom} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>Total</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>
            <NumberFormat value={totalTo} displayType={'text'} thousandSeparator={true} prefix={'BTC '} /> | <NumberFormat value={totalFrom} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}