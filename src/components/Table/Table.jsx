import React from 'react';
import { Table, TableSortLabel } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import {
  withStyles, createStyles, makeStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StyledTableRow = withStyles((theme) => createStyles({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export default function SimpleTable(props) {
  const classes = useStyles();
  const {
    id, column, data, onSelect, onSort, orderby, order,
  } = props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow hover>
            {
              column && column.length && column.map(({ align, label, field }) => (
                <TableCell align={align} className={classes.column}>
                  <TableSortLabel
                    align={align}
                    active={orderby === field}
                    direction={orderby === field ? order : 'asc'}
                    onClick={onSort(field)}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>


        <TableBody>
          {data.map((element) => (
            <StyledTableRow hover key={element[id]}>
              {
                column && column.length && column.map(({ align, field, format }) => (
                  <TableCell onClick={(event) => onSelect(event, element.name)} align={align} component="th" scope="row" order={order} orderby={orderby}>
                    {format !== undefined ? format(element[field]) : element[field]}

                  </TableCell>
                ))
              }

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SimpleTable.propTypes = {
  id: PropTypes.string.isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  orderby: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
};

SimpleTable.defaultProps = {
  orderby: '',
  order: 'asc',
};
