import React, { useState, useMemo } from "react";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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
  const [originAccount,  setOriginAccount]  = React.useState();
  const [cuentaDestino, setCuentaDestino] = React.useState();
  const [amount,        setAmount]        = useState(1000);
  const [exchangeRate,  setExchangeRate]  = useState(216329.24);
  const [commission,  setCommission]      = useState(0);
  
  const returnAmount = Math.ceil( (amount / exchangeRate) * 100000000 ) / 100000000
  const commissionAmount = returnAmount * .005
  return (
    <>

      <FormControl >
        <InputLabel htmlFor="age-simple">Cuenta de Origen</InputLabel>
        <Select
          value={originAccount}
          onChange={e => { setOriginAccount(e.target.value) }}
        >
          <MenuItem value={10}>MXN</MenuItem>
          <MenuItem value={20}>Bitso MXN</MenuItem>
          <MenuItem value={30}>Bitso MXN</MenuItem>
        </Select>
      </FormControl>
      Saldo $100 MXN

      <FormControl >
        <InputLabel htmlFor="age-simple">Cuenta de Destino</InputLabel>
        <Select
          value={cuentaDestino}
          onChange={e => { setCuentaDestino(e.target.value) }}
        >
          <MenuItem value={10}>MXN</MenuItem>
          <MenuItem value={20}>Bitso MXN</MenuItem>
          <MenuItem value={30}>Bitso MXN</MenuItem>
        </Select>
      </FormControl>
      Saldo 0.05 BTC

      <TextField
        label="Monto"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />

      <TextField
        label="Precio / Tipo de Cambio"
        value={exchangeRate}
        onChange={e => setExchangeRate(e.target.value)}
      />
      { returnAmount  } | 
      { commissionAmount  }
      <TextField
        id="Precio / Tipo de Cambio"
        label="Number"
        value={exchangeRate}
        onChange={e => setExchangeRate(e.target.value)}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="Precio / Tipo de Cambio"
        label="Number"
        value={commission}
        onChange={e => setCommission(e.target.value)}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />

    </>
  );

}