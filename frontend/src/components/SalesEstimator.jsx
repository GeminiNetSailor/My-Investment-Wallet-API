import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import { Grid, Typography } from "@material-ui/core";
import { DecimalFormat } from "./helpers/NumbersFormaters";

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

  const { buy } = props;
  console.log(props)
  const [comision, setcomision] = useState(0.0065);
  const [estimateProfit, setEstimateProfit] = useState(100);

  /*
  * Estimate Sell
  */
  const sellSubTotalFrom = round((buy.totalCost + estimateProfit) * (comision + 1), 4)

  const estimateSellExchangeRate = round(sellSubTotalFrom / buy.reciveAmount, 4);

  const exchangeRateDiference = round(estimateSellExchangeRate - buy.exchangeRate, 4);

  const sellSubTotalTo = round(sellSubTotalFrom / estimateSellExchangeRate, 6);

  const sellComisionFrom = round(sellSubTotalFrom * comision, 4);
  const sellComisionTo = round(sellComisionFrom / estimateSellExchangeRate, 6);

  const sellTotalTo = round(sellSubTotalTo - sellComisionTo, 6);
  const total = round(sellTotalTo * estimateSellExchangeRate, 4);
  
  /*
  * Buy To Sell Compare
  */

  const exchangeRateDiferencePorcentage = round(((estimateSellExchangeRate - buy.exchangeRate) / buy.exchangeRate) * 100, 4);
  const profitFrom = round(total - buy.totalCost, 4);
  const profitFromPorcentage = round(((total - buy.totalCost) / buy.totalCost) * 100, 4);


  return (
    <Grid container>
      <Grid item>
        <TextField
          label="Sell Comision"
          value={comision}
          onChange={e => setcomision(Number(e.target.value))}
          InputProps={{
            inputComponent: DecimalFormat,
          }}
        />
        <TextField
          label="Estimated Profit"
          value={estimateProfit}
          onChange={e => setEstimateProfit(Number(e.target.value))}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
      </Grid>
      <Grid item container xs={12} sm={12}>
        <Grid item xs={12}>
          <h2>Estimate Sell at <NumberFormat value={estimateSellExchangeRate} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h2>
          <small>Diffence from buy: <NumberFormat value={exchangeRateDiference} displayType={'text'} thousandSeparator={true} prefix={'$'} /> <NumberFormat value={exchangeRateDiferencePorcentage} displayType={'text'} thousandSeparator={true} prefix={'%'} /></small>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>SubTotal</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>
            <NumberFormat value={sellSubTotalFrom} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={sellSubTotalTo} displayType={'text'} thousandSeparator={true} prefix={'BTC '} />
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>Comision</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>
            <NumberFormat value={sellComisionFrom} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={sellComisionTo} displayType={'text'} thousandSeparator={true} prefix={'BTC '} />
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>Total</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>
            <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={sellTotalTo} displayType={'text'} thousandSeparator={true} prefix={'BTC '} />
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>Profit</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>
            <NumberFormat value={profitFrom} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={profitFromPorcentage} displayType={'text'} thousandSeparator={true} prefix={'%'} />
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}