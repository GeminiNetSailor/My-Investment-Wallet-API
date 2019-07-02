import React, { useState, useEffect } from "react";

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: `40%`,
  },
}));

export default props => {
  const classes = useStyles();
  const [account, setAccount] = useState('');
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    props.onChange(
      account,
      currency
    )
    // eslint-disable-next-line
  }, [account, currency]);

  return (
    <form autoComplete="off">
      <FormControl className={classes.formControl} >
        <InputLabel htmlFor="origin-account">Account</InputLabel>
        <Select
          value={account}
          onChange={e => { setAccount(e.target.value) }}
          inputProps={{
            name: 'origin-account',
            id: 'origin-account',
          }}
          className={classes.select}
        >
          <MenuItem value={20}>Bitso</MenuItem>
          <MenuItem value={30}>HSBC</MenuItem>
          <MenuItem value={10}>Efectivo</MenuItem>
          <MenuItem value={30}>Bancomer</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} >
        <InputLabel>Currency</InputLabel>
        <Select
          value={currency}
          onChange={e => { setCurrency(e.target.value) }}
          className={classes.select}
        >
          <MenuItem value={20}>MXN</MenuItem>
          <MenuItem value={30}>USD</MenuItem>
          <MenuItem value={10}>BTC</MenuItem>
          <MenuItem value={30}>ETH</MenuItem>
        </Select>
      </FormControl>

    </form >

  );
}