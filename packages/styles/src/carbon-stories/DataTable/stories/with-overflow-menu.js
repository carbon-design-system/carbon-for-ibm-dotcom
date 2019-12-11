/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {
  DataTable,
  OverflowMenuItem,
  OverflowMenu,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
} from 'carbon-components-react';
import { initialRows, headers } from './shared';

export default props => (
  <DataTable
    rows={initialRows}
    headers={headers}
    {...props}
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
    }) => (
      <TableContainer title="DataTable" description="With selection">
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              <TableSelectAll {...getSelectionProps()} />
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
              <TableHeader />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow {...getRowProps({ row })}>
                <TableSelectRow {...getSelectionProps({ row })} />
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
                <TableCell>
                  <OverflowMenu flipped>
                    <OverflowMenuItem primaryFocus>Action 1</OverflowMenuItem>
                    <OverflowMenuItem>Action 2</OverflowMenuItem>
                    <OverflowMenuItem>Action 3</OverflowMenuItem>
                  </OverflowMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  />
);
