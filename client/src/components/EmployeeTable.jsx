import React, { useCallback } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField
} from '@mui/material';
import { FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { filterEmployees, setSearchTerm } from '../redux/action';

const EmployeeTable = ({ employees }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Start Date', accessor: 'startDate' },
      { Header: 'Department', accessor: 'department' },
      { Header: 'Date of Birth', accessor: 'dateOfBirth' },
      { Header: 'Street', accessor: 'street' },
      { Header: 'City', accessor: 'city' },
      { Header: 'State', accessor: 'state' },
      { Header: 'Zip Code', accessor: 'zipCode' },
    ],
    []
  );

  const filteredEmployees = useSelector(state => state.employees.filteredEmployees);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    gotoPage,
    setPageSize,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
  } = useTable(
    {
      columns,
      data: filteredEmployees,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.employees.searchTerm);

  const handleSearchChange = useCallback((event) => {
    dispatch(setSearchTerm(event.target.value));
    dispatch(filterEmployees(event.target.value));
  }, [dispatch]); 

  return (
    <Box className="container">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <FormControl variant="outlined" size="small">
          <InputLabel id="entries-label">Show</InputLabel>
          <Select
            labelId="entries-label"
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            label="Show"
            inputProps={{ 'aria-labelledby': 'entries-label' }}
          >
            {[10, 25, 50].map(size => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          size="small"
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search employees"
        />
      </Box>
      <TableContainer component={Paper} className="tableContainer">
        <Table {...getTableProps()} aria-label="Employee Table">
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box aria-live="polite">
            Showing {pageIndex * pageSize + 1} to {pageIndex * pageSize + page.length} of {employees.length} entries
          </Box>
          <Box display="flex" alignItems="center">
            <IconButton
              className="pagination-button"
              onClick={() => gotoPage(0)}
              aria-label="First Page"
              disabled={!canPreviousPage}
            >
              <FirstPage />
            </IconButton>
            <IconButton
              className="pagination-button"
              onClick={() => previousPage()}
              aria-label="Previous Page"
              disabled={!canPreviousPage}
            >
              <KeyboardArrowLeft />
            </IconButton>
            <Box component="span" mx={2}>
              {pageIndex + 1}
            </Box>
            <IconButton
              className="pagination-button"
              aria-label="Next Page"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <KeyboardArrowRight />
            </IconButton>
            <IconButton
              className="pagination-button"
              aria-label="Last Page"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <LastPage />
            </IconButton>
          </Box>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default EmployeeTable;
