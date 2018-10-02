import React, { PropTypes } from 'react'

const StyledTable = props => {
  const TableHeadCell = cell =>
    <th className={`styled-table__header-item ${cell.className}`} dangerouslySetInnerHTML={{__html: cell.text }} />

  const TableHead = header =>
    <thead className="styled-table__header">
      <tr className="styled-table__header-row">
        {header.cells.map(cell => <TableHeadCell {...cell} />)}
      </tr>
    </thead>

  const TableCell = cell =>
    <td className={`styled-table__cell ${cell.className}`} dangerouslySetInnerHTML={{__html: cell.text }} colSpan={cell.colspan} />

  const TableRow = row =>
    <tr className={`styled-table__row ${row.className}`}>
      {row.cells.map(cell => <TableCell {...cell} />)}
    </tr>

  return (
    <table className={`styled-table ${props.className}`}>
      <TableHead {...props.header} />
      <tbody>
        {props.rows.map(row => <TableRow {...row} />)}
      </tbody>
    </table>
  )
}

StyledTable.propTypes = {
  className: PropTypes.string,
  header: PropTypes.object,
  rows: PropTypes.array,
}

StyledTable.defaultProps = {
  className: '',

  header: {
    cells: [],
  },
  rows: [
    {
      className: '',
      cells: [],
    },
  ],
}

export default StyledTable
