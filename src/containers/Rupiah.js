import React, {Component} from 'react';
import { Grid } from '@material-ui/core'
import SampleTable from '../components/SampleTable'
import SampleForm from '../components/SampleForm';

class Rupiah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fractions: [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50],
      amount: '',
      error: false,
      textError: '',
      results: [],
      amountLeft: null,
    }
  }

  handleAmountChange = (e) => {
    this.setState({amount: e.target.value})
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleProcess()
    }
  }

  handleProcess = () => {    
    const fractions = this.state.fractions;
    let amount = 0;
    let temps = [];
    let results = [];
    const validation = this.handleValidationAmount();

    if (validation) {      
      amount = validation
      // calculate the minimum number of rupiahs process
      while (amount >= 50) {
        for (var i = 0; i < fractions.length; i++) {
          if (amount >= fractions[i]) {
            temps[fractions[i]] = temps[fractions[i]] ? temps[fractions[i]] + 1 : 1
            amount = amount - fractions[i]
            break
          }
        }
      }
      // sort descending the result above
      let resultsOrder = temps.length - 1
      temps.forEach((value, key) => {
        results[resultsOrder] = { amount: key, qty: value }
        resultsOrder--
      });

      this.setState({
        results: results,
        amountLeft: amount,
        error: false,
        textError: '',
      });
    }
  }

  handleValidationAmount = () => {
    let amount = this.state.amount.toLowerCase()
    // check if there is 'rp' word    
    if (amount.indexOf('rp') > -1) {
      const rpSplit = amount.split('rp');        
      if (rpSplit[0].replace(/\s+/g, '') === '' && rpSplit[rpSplit.length - 1].replace(' ', '') === '') {
        // check if amount is Rp only
        this.setState({error: true, textError: 'Missing value!', results: [], amountLeft: null});
        return false
      } else if (rpSplit[rpSplit.length - 1].replace(/\s+/g, '') === '') { 
        // check if Rp is wrong position
        this.setState({error: true, textError: 'Valid character in wrong position!', results: [], amountLeft: null});
        return false
      } else {
        amount = rpSplit[1].replace(/\s+/g, '');          
      }
    }

    if (amount.indexOf('.') > -1) {
      amount = amount.replace('.', ''); 
    }

    // check if there are ',' & '.' in a input and after ',' is not 00
    if (amount.indexOf(',') > -1 || amount.indexOf(' ') > -1) {
      if (amount.split(',')[1] !== '00') {
        this.setState({error: true, textError: 'Invalid separator!', results: [], amountLeft: null});
        return false
      }
    }
    
    return parseInt(amount)
  }

  render(){
    return (
      <div className="container">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <p className="title">Rupiah Denominations</p>
          </Grid>
        </Grid>
        <SampleForm
          amount={this.state.amount}
          error={this.state.error}
          textError={this.state.textError}
          onAmountChange={(e) => this.handleAmountChange(e)}
          onKeyPress={(e) => this.handleKeyPress(e)}
          onProcess={(e) => this.handleProcess(e)}
        />
        <SampleTable
          data={this.state.results}
          amountLeft={this.state.amountLeft}
        />
      </div>
    )
  }
}

export default Rupiah;
