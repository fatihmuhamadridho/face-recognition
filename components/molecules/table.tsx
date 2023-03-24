import { styles } from '@libs';
import { Table as TableCore } from '@mantine/core';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' }
];

const Table = () => {
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
      <td>{element.mass}</td>
    </tr>
  ));

  return (
    <div className={styles('w-full !overflow-x-scroll')}>
      <TableCore striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Element position</th>
            <th>Element name</th>
            <th>Symbol</th>
            <th>Atomic mass</th>
          </tr>
        </thead>
        <tbody className={styles('w-full !overflow-hidden')}>{rows}</tbody>
      </TableCore>
    </div>
  );
};

export default Table;
