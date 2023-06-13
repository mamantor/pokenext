import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";

import styles from "./pokeMoves.module.scss";

export default function PokeMoves({ moves }: { moves: pokeMove[] }) {
  const headers = [
    {
      header: "Name",
      key: "id",
    },
    {
      header: "Level",
      key: "level_learned_at",
    },
    {
      header: "Method",
      key: "learning_method",
    },
  ];
  return (
    <div className={styles.moves_table}>
      {moves.length ? (
        <DataTable headers={headers} rows={moves}>
          {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header: { header: string; key: string }) => (
                    <TableHeader
                      key={header.key}
                      {...getHeaderProps({ header })}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    {row.cells.map((cell: any) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DataTable>
      ) : (
        <p>No Moves</p>
      )}
    </div>
  );
}
