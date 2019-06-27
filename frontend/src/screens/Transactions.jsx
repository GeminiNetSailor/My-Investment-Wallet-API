import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';


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


const MyComponent = ({ ...props }) => {
  const total = Number(props.value);
  const calculatedValue = useMemo(
    () => {
      return total + 10
      // Do expensive calculation and return.
    },
    [total]
  )

  return (
    <div>
      {calculatedValue}
    </div>
  )
}


export default class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        totalAmount: 0
      }
    }
  }

  componentDidUpdate() {

  }

  handleChange = name => event => {

    this.setState({
      values: {
        [name]: event.target.value
      }
    })
  };

  NumberFormatCustom = props => {
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

  render() {
    return (
      <div>
        <MyComponent value={this.state.values["totalAmount"]} />
        <TextField
          label="react-number-format"
          value={this.state.values[" totalAmount"]}
          onChange={this.handleChange("totalAmount")}
          InputProps={{
            inputComponent: this.NumberFormatCustom,
          }}
        />
      </div>
    );
  }
}