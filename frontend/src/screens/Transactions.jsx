import React, { useState } from "react";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Grid, Paper, Typography } from "@material-ui/core";


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

  const [originAccount, setOriginAccount] = React.useState('');
  const [originCurrency, setOriginCurrency] = useState('');

  const [destinationAccount, setDestinationAccount] = React.useState('');
  const [destinationCurrency, setDestinationCurrency] = useState('');

  const [originAmount, setAmount] = useState(10000);
  const [exchangeRate, setExchangeRate] = useState(237000.48);
  const [commissionBuy, setCommissionBuy] = useState(0.005);
  const [commissionSell, setCommissionSell] = useState(0.0065);

  const [estimateProfitOrigin, setEstimateProfitOrigin] = useState(100);

  const estimateReturnAmountOriginCurrency = originAmount;
  const estimateReturnAmountDestinationCurrency = Math.ceil((originAmount / exchangeRate) * 100000000) / 100000000;

  const commissionAmountOriginCurrency = originAmount * commissionBuy;
  const commissionAmountDestinationCurrency = estimateReturnAmountDestinationCurrency * commissionBuy;
  
  const returnAmountOriginCurrency = estimateReturnAmountOriginCurrency - commissionAmountOriginCurrency;
  const returnAmountDestinationCurrency = estimateReturnAmountDestinationCurrency - commissionAmountDestinationCurrency;

  const estimateSellValue = ((estimateReturnAmountOriginCurrency + estimateProfitOrigin) * (commissionSell + 1)) // MXN
  
  const sellComisionAmount = (estimateSellValue * commissionSell); //MXN

  const sellExchangeAmount = estimateSellValue / returnAmountDestinationCurrency; //BTC
  const estimateSellValueDestination = estimateSellValue / sellExchangeAmount //BTC

  const destinationSellAmountComision = (sellComisionAmount / sellExchangeAmount); //BTC

  const returnTotal = (estimateSellValueDestination - destinationSellAmountComision) * sellExchangeAmount; //MXN

  return (
    <>
      <Grid container spacing={8}>

        <Grid item xs={6}>
          <Paper>

            <Typography variant="h6" gutterBottom>Origen</Typography>

            <Grid container spacing={8}>
              <Grid item xs={12} sm={3}>
                <FormControl >
                  <InputLabel htmlFor="origin-account">Account</InputLabel>
                  <Select
                    value={originAccount}
                    onChange={e => { setOriginAccount(e.target.value) }}
                    inputProps={{
                      name: 'origin-account',
                      id: 'origin-account',
                    }}
                  >
                    <MenuItem value={20}>Bitso</MenuItem>
                    <MenuItem value={30}>HSBC</MenuItem>
                    <MenuItem value={10}>Efectivo</MenuItem>
                    <MenuItem value={30}>Bancomer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3}>
                <FormControl >
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={originCurrency}
                    onChange={e => { setOriginCurrency(e.target.value) }}
                  >
                    <MenuItem value={20}>MXN</MenuItem>
                    <MenuItem value={30}>USD</MenuItem>
                    <MenuItem value={10}>BTC</MenuItem>
                    <MenuItem value={30}>ETH</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

            </Grid>

          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper>

            <Typography variant="h6" gutterBottom>Origen</Typography>

            <Grid container spacing={8}>
              <Grid item xs={12} sm={3}>
                <FormControl >
                  <InputLabel htmlFor="origin-account">Account</InputLabel>
                  <Select
                    value={destinationAccount}
                    onChange={e => { setDestinationAccount(Number(e.target.value)) }}
                    inputProps={{
                      name: 'origin-account',
                      id: 'origin-account',
                    }}
                  >
                    <MenuItem value={20}>Bitso</MenuItem>
                    <MenuItem value={30}>HSBC</MenuItem>
                    <MenuItem value={10}>Efectivo</MenuItem>
                    <MenuItem value={30}>Bancomer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3}>
                <FormControl >
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={destinationCurrency}
                    onChange={e => { setDestinationCurrency(e.target.value) }}
                  >
                    <MenuItem value={20}>MXN</MenuItem>
                    <MenuItem value={30}>USD</MenuItem>
                    <MenuItem value={10}>BTC</MenuItem>
                    <MenuItem value={30}>ETH</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

            </Grid>

          </Paper>
        </Grid>

      </Grid>

      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper>
            <TextField
              label="Monto"
              value={originAmount}
              onChange={e => setAmount(Number(e.target.value))}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
            <TextField
              label="Precio / Tipo de Cambio"
              value={exchangeRate}
              onChange={e => setExchangeRate(Number(e.target.value))}
            />
            <TextField
              label="Buy Comision"
              value={commissionBuy}
              onChange={e => setCommissionBuy(Number(e.target.value))}
            />
            <TextField
              label="Sell Comision"
              value={commissionSell}
              onChange={e => setCommissionSell(Number(e.target.value))}
            />
            <TextField
              label="Estimated Profit"
              value={estimateProfitOrigin}
              onChange={e => setEstimateProfitOrigin(Number(e.target.value))}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={8}>

        <Grid item xs={12}>
          <Paper>
            <p>
            Sub Total a recibir: {estimateReturnAmountDestinationCurrency} | ${estimateReturnAmountOriginCurrency}
            </p>
            <p>
            Comision: {commissionAmountDestinationCurrency} | ${commissionAmountOriginCurrency} 
            </p>
            <p>
            Total: {returnAmountDestinationCurrency} | ${returnAmountOriginCurrency}
            </p>
            <p>
              Sell Amount: ${estimateSellValue} =   BTC {estimateSellValueDestination} | - Comision ${sellComisionAmount}
            </p>
            <p>
              Sell Point: {sellExchangeAmount} | Diference: {sellExchangeAmount - exchangeRate} | diferencia del %{( (sellExchangeAmount - exchangeRate) / exchangeRate ) * 100}
            </p>
            <p>
              return + Profit: {returnTotal}
            </p>
          </Paper>
        </Grid>
      </Grid>

    </>
  );

}