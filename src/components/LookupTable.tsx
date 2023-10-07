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
} from '@mui/material';
import jsonData from '../data/main.json';

type GenericObject = Record<string, string | number>;

const castToLowerCaseString = (value: string | number) => value.toString().toLowerCase();

const LookupTable = () => {
  const [data] = useState<GenericObject[]>(jsonData);
  const [columns, setColumns] = useState<string[]>([]);
  const [lookupValues, setLookupValues] = useState<GenericObject>({});

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
          {filteredData.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>{row[column]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LookupTable;
