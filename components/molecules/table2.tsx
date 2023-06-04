import { clsx, Table as TableCore } from '@mantine/core';

interface ITable {
    header?: any;
    data?: any;
    pagination?: any;
    limit?: any;
    handleRowClick?: any;
    [key: string]: any
}

const Table = ({ header, data, pagination, limit, handleRowClick }: ITable) => {
  return (
    <TableCore
      className="!border-collapse"
    >
      <thead>
        <tr>
          {header?.map((item: any, idx: any) => (
            <th
              key={idx}
              style={{
                width: item.width,
                padding: '12px',
                color: '#6B7280',
                fontSize: '12px',
                fontWeight: 500
              }}>
              {item.label}
            </th>
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
                      key={`${key}-${index}`}
                      style={{
                        padding: '18px 12px',
                        color: '#6B7280',
                        fontSize: '14px',
                        fontWeight: 300
                      }}>
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
                      }}
                      style={{
                        padding: '18px 12px',
                        color: '#6B7280',
                        fontSize: '14px',
                        fontWeight: 300
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
  );
};

export { Table };
