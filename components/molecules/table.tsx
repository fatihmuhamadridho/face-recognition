import { styles } from '@libs';
import { Table as TableCore, Button } from '@mantine/core';

const Table = ({ header, data }: any) => {
  const rows = [1, 2, 3].map((row: any, index: any) => (
    <tr key={index}>
      <td className={styles('w-[50px]')}>{index + 1}</td>
    </tr>
  ));

  return (
    <div className={styles('w-full !overflow-x-scroll')}>
      <TableCore striped highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            {header?.map((head: any) => {
              return <th key={head}>{head}</th>;
            }) || <th>No</th>}
          </tr>
        </thead>
        <tbody className={styles('w-full !overflow-hidden')}>
          {data || rows}
        </tbody>
      </TableCore>
    </div>
  );
};

export default Table;
