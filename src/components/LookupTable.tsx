import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
} from '@mui/material';
import jsonData from '../data/main.json';

type GenericObject = Record<string, string | number>;

const castToLowerCaseString = (value: string | number) => value.toString().toLowerCase();

const LookupTable = () => {
  const [data] = useState<GenericObject[]>(jsonData);
  const [columns, setColumns] = useState<string[]>([]);
  const [lookupValues, setLookupValues] = useState<GenericObject>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (data.length > 0) {
      const columnNames = Object.keys(data[0]);
      setColumns(columnNames);
      setLookupValues(
        columnNames.reduce((acc: GenericObject, column: string) => {
          acc[column] = '';
          return acc;
        }, {})
      );
    }
  }, [data]);

  const filteredData = data.filter((row: GenericObject) =>
    columns.every((column) =>
      castToLowerCaseString(row[column]).includes(castToLowerCaseString(lookupValues[column]))
    )
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column}>
                <TextField
                  label={column}
                  variant="outlined"
                  size="small"
                  value={lookupValues[column]}
                  onChange={(e) => {
                    setLookupValues({
                      ...lookupValues,
                      [column]: e.target.value,
                    });
                  }}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage} // Corrected prop for handling page change
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Rows per page:"
      />
    </TableContainer>
  );
};

export default LookupTable;
