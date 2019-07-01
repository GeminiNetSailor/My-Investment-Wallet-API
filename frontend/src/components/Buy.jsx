import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import { Grid, Typography } from "@material-ui/core";

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

export default props => {

  const [buyAmount, setBuyAmount] = useState(10000);
  const [exchangeRate, setExchangeRate] = useState(237000.48);
  const [commissionBuy, setCommissionBuy] = useState(0.005);

  const buySubTotal = round(buyAmount / exchangeRate, 6);

  const buyComisionFrom = round(buyAmount * commissionBuy, 4);
  const buyComisionTo = round(buySubTotal * commissionBuy, 6);

  const buyTotalFrom = round(buyAmount - buyComisionFrom, 4);
  const buyTotalTo = round(buySubTotal - buyComisionTo, 6);

  useEffect(
    () => {
      props.onChange(
        buyAmount,
        exchangeRate,
        commissionBuy,
        buyTotalTo
      )
    }
  ,[buyAmount, exchangeRate, commissionBuy, buyTotalTo]);

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <TextField
          label="Monto"
          value={buyAmount}
          onChange={e => setBuyAmount(Number(e.target.value))}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          label="Precio / Tipo de Cambio"
          value={exchangeRate}
          onChange={e => setExchangeRate(Number(e.target.value))}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          label="Buy Comision"
          value={commissionBuy}
          onChange={e => setCommissionBuy(Number(e.target.value))}
        />
      </Grid>
      <Grid item container xs={12} sm={12}>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Buy</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>SubTotal</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>
            <NumberFormat value={buySubTotal} displayType={'text'} thousandSeparator={true} prefix={'BTC '} /> | <NumberFormat value={buyAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>Comision</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>
            <NumberFormat value={buyComisionTo} displayType={'text'} thousandSeparator={true} prefix={'BTC '} /> | <NumberFormat value={buyComisionFrom} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>Total</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>
            <NumberFormat value={buyTotalTo} displayType={'text'} thousandSeparator={true} prefix={'BTC '} /> | <NumberFormat value={buyTotalFrom} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}