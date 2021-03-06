import React from 'react'
import PropTypes from 'prop-types'
import {
  TextField,
  Button,
  Grid
} from '@material-ui/core'

const SampleForm = props => {
  return (
    <Grid container spacing={1}>
        <Grid item xs={9}>
          <TextField
            label="Amount"
            onChange={props.onAmountChange}
            onKeyPress={props.onKeyPress}
            margin="normal"
            error={props.error}
            helperText={props.textError}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={props.amount === ''}
            onClick={props.onProcess}
            style={{ marginTop: 30 }}
          >
              Process
          </Button>
        </Grid>
    </Grid>
  )
}

SampleForm.propTypes = {
  amount: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  textError: PropTypes.string.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onProcess: PropTypes.func.isRequired,
}

export default SampleForm;
