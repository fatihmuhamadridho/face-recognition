import { clsx, ScrollArea, Table as TableCore } from '@mantine/core';

interface ITable {
  header?: any;
  data?: any;
  pagination?: any;
  limit?: any;
  handleRowClick?: any;
  height?: number;
  [key: string]: any;
}

const Table = ({ header, data, pagination, limit, handleRowClick, height = 300 }: ITable) => {
  return (
    <ScrollArea h={height}>
      <TableCore className="!border-collapse">
        <thead>
          <tr>
            {header?.map((item: any, idx: any) => (
              <th key={idx}>{item.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any, index: any) => {
            if (
              pagination
              && index < limit * pagination.active
              && index >= limit * Number(pagination.active - 1)
            ) {
              return (
                <tr
                  className="pointer-events-none cursor-pointer"
                  key={index}
                  onClick={() =>
                    typeof handleRowClick === 'function' && handleRowClick(row)
                  }>
                  {header?.map(({ key }: any) => {
                    return (
                      <td
                        className={clsx(
                          typeof handleRowClick === 'function'
                          //  && styles.rowClick
                        )}
                        key={`${key}-${index}`}>
                        {typeof key === 'function' ? key(row, index) : row[key]}
                      </td>
                    );
                  })}
                </tr>
              );
            }

            if (!pagination) {
              return (
                <tr key={index}>
                  {header?.map(({ key }: any) => {
                    return (
                      <td
                        className={clsx(
                          typeof handleRowClick === 'function'
                          //  && styles.rowClick
                        )}
                        key={`${key}-${index}`}
                        onClick={() => {
                          if (
                            typeof handleRowClick === 'function'
                            && typeof key !== 'function'
                          )
                            handleRowClick(row);
                        }}>
                        {typeof key === 'function' ? key(row, index) : row[key]}
                      </td>
                    );
                  })}
                </tr>
              );
            }

            return null;
          })}
        </tbody>
      </TableCore>
    </ScrollArea>
  );
};

export { Table };
