import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Grid, Paper, Typography } from "@material-ui/core";


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


  const [account, setAccount] = useState('');
  const [currency, setCurrency] = useState('');

  useEffect(
    () => {
      props.onChange(
        account,
        currency
      )
    }
  ,[account, currency]);

  return (

    <Grid container spacing={8}>
      <Grid item xs={12} sm={3}>
        <FormControl >
          <InputLabel htmlFor="origin-account">Account</InputLabel>
          <Select
            value={account}
            onChange={e => { setAccount(e.target.value) }}
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
            value={currency}
            onChange={e => { setCurrency(e.target.value) }}
          >
            <MenuItem value={20}>MXN</MenuItem>
            <MenuItem value={30}>USD</MenuItem>
            <MenuItem value={10}>BTC</MenuItem>
            <MenuItem value={30}>ETH</MenuItem>
          </Select>
        </FormControl>
      </Grid>

    </Grid>
  );
}