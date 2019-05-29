import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';

const SampleTable = props => {
  let no = 1
  return (
    <div>
      <Grid container spacing={1} >
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          { props.data && props.data.length > 0 && 
            <Paper style={{ marginTop: 15 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">No</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Cash</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    props.data && props.data.map((data, i) => {
                      return(
                        <TableRow key={i}>
                          <TableCell align="center">{no++}</TableCell>
                          <TableCell align="center">{data.qty}</TableCell>
                          <TableCell align="right">{data.amount}</TableCell>
                        </TableRow>
                      ) 
                    })
                  }
                </TableBody>
              </Table>
            </Paper>
          }

          { props.amountLeft > 0 &&
            <Paper style={{ marginTop: 15 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2} align="left">Amount Left</TableCell>
                    <TableCell align="right">Rp. {props.amountLeft}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          }
        </Grid>
      </Grid>
    </div>
  );
}

SampleTable.displayName = 'SimpleTable'
SampleTable.propTypes = {
  // classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  amountLeft: PropTypes.number
}

export default SampleTable;
