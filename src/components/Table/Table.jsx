import React from 'react';
import { Table, TableSortLabel, Button } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
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

// handleChangeRowsPerPage = (event) => {
//   setRowsPerPage(parseInt(event.target.value, 10));
//   setPage(0);
// };


export default function SimpleTable(props) {
  const classes = useStyles();
  const {
    // eslint-disable-next-line max-len
    id, column, data, onSelect, onSort, orderBy, order, actions, count, rowsPerPage, page, onChangePage, onChangeRowsPerPage,
  } = props;
  return (
    <>
      <Paper className={classes.paper}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow hover>
                {
                  column && column.length && column.map(({ align, label, field }) => (
                    <TableCell align={align} className={classes.column}>
                      <TableSortLabel
                        align={align}
                        active={orderBy === field}
                        direction={orderBy === field ? order : 'asc'}
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
              {(rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data
              ).map((element) => (
                <StyledTableRow hover key={element[id]}>
                  {
                    column && column.length && column.map(({ align, field, format }) => (
                      <TableCell onClick={(event) => onSelect(event, element.name)} align={align} component="th" scope="row" order={order} orderBy={orderBy}>
                        {format ? format(element[field]) : element[field]}
                      </TableCell>
                    ))
                  }
                  {actions && actions.length && actions.map(({ icon, handler }) => (
                    <TableCell>
                      <Button onClick={() => handler(element)}>
                        {icon}
                      </Button>
                    </TableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
            <TablePagination
              rowsPerPageOptions={[3, 5, 10, 15, 100]}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

SimpleTable.propTypes = {
  id: PropTypes.string.isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

SimpleTable.defaultProps = {
  orderBy: '',
  order: 'asc',
};
