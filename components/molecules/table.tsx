import { styles } from '@libs';
import { Table as TableCore } from '@mantine/core';
import { useEffect, useState } from 'react';
import {
  IconInfoCircle,
  IconEditCircle,
  IconCircleX
} from '@tabler/icons-react';

interface ITable {
  headers?: string[];
  hideHeaders?: string[];
  hideActions?: Array<'detail' | 'edit' | 'delete'>;
  columns?: Array<{ label: string; value?: any }>;
  data?: any[];
  [key: string]: any;
}

const Table = ({
  headers,
  hideHeaders,
  hideActions,
  columns,
  data
}: ITable) => {
  const [attributes, setAttributes] = useState<string[]>();
  const [columsAtt, setColumnsAtt] = useState<string[]>();

  useEffect(() => {
    data?.map((row: any, index: number) => {
      setAttributes(Object.keys(row));
    });
  }, [data]);

  useEffect(() => {
    setColumnsAtt(columns?.map((row: any, index: number) => row.value));
  }, [columns]);

  const columnsAttRows = data?.map((row: any, index: number) => {
    return (
      <tr key={index}>
        {columsAtt?.map((att: string, index: number) => (
          <td key={index}>{row?.[att] ? row?.[att] : att !== '' ? att : ''}</td>
        ))}
        {!hideActions?.includes('detail') ||
        !hideActions?.includes('edit') ||
        !hideActions?.includes('delete') ? (
          <td className={styles('w-max', 'flex', 'space-x-3')}>
            {!hideActions?.includes('detail') && (
              <IconInfoCircle
                className="cursor-pointer"
                size={28}
                color="green"
              />
            )}
            {!hideActions?.includes('edit') && (
              <IconEditCircle
                className="cursor-pointer"
                size={28}
                color="orange"
              />
            )}
            {!hideActions?.includes('delete') && (
              <IconCircleX className="cursor-pointer" size={28} color="red" />
            )}
          </td>
        ) : null}
      </tr>
    );
  });

  const rows = data?.map((row: any, index: number) => {
    return (
      <tr key={index}>
        {attributes?.map((att: string, attIndex: number) => {
          if (Array.isArray(row?.[att]) || typeof row?.[att] === 'object') {
            return <td key={attIndex}>null</td>;
          }

          if (typeof row?.[att] === 'boolean') {
            return <td key={attIndex}>{row?.[att] ? 'true' : 'false'}</td>;
          }

          return (
            <td key={attIndex} className="w-max whitespace-nowrap">
              {row?.[att]}
            </td>
          );
        })}
        {!hideActions?.includes('detail') ||
        !hideActions?.includes('edit') ||
        !hideActions?.includes('delete') ? (
          <td className={styles('w-max', 'flex', 'space-x-3')}>
            {!hideActions?.includes('detail') && (
              <IconInfoCircle
                className="cursor-pointer"
                size={28}
                color="green"
              />
            )}
            {!hideActions?.includes('edit') && (
              <IconEditCircle
                className="cursor-pointer"
                size={28}
                color="orange"
              />
            )}
            {!hideActions?.includes('delete') && (
              <IconCircleX className="cursor-pointer" size={28} color="red" />
            )}
          </td>
        ) : null}
      </tr>
    );
  });

  if (!data) {
    return null;
  }

  return (
    <div className="pb-4 relative overflow-x-auto">
      <TableCore striped withBorder withColumnBorders>
        <thead>
          <tr>
            {columns &&
              columns
                ?.concat([{ label: 'actions' }])
                .map((att: { label: string; value?: any }, index: number) => {
                  return <th key={index}>{att.label}</th>;
                })}

            {!columns &&
              attributes
                ?.filter((att: any) => {
                  if (headers) {
                    const attFilter = headers.find((head: any) => head === att);
                    if (attFilter) {
                      return attFilter;
                    }
                  } else {
                    return att;
                  }
                })
                ?.filter((attHide: any) => {
                  if (attHide) {
                    const attHideFind = hideHeaders?.find(
                      (head: any) => head === attHide
                    );
                    if (attHideFind) {
                      return null;
                    } else {
                      return attHide;
                    }
                  } else {
                    return attHide;
                  }
                })
                ?.concat(['actions'])
                .filter((item: string) => {
                  if (
                    hideActions?.includes('detail') &&
                    hideActions?.includes('edit') &&
                    hideActions?.includes('delete')
                  ) {
                    return item !== 'actions';
                  } else {
                    return item;
                  }
                })
                .map((head: any, index: any) => <th key={index}>{head}</th>)}
          </tr>
        </thead>
        <tbody>{columns ? columnsAttRows : rows}</tbody>
      </TableCore>
    </div>
  );
};

export { Table };
