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
  customHeaders?: string[];
  hideHeaders?: string[];
  data?: any[];
  [key: string]: any;
}

const Table = ({ headers, customHeaders, hideHeaders, data }: ITable) => {
  const [attributes, setAttributes] = useState<any[]>();

  useEffect(() => {
    data?.map((row: any, index: any) => {
      setAttributes(Object.keys(row));
    });
  }, [data]);

  const rows = data?.map((row: any, index: any) => {
    return (
      <tr key={index}>
        {attributes?.map((att: any, attIndex: any) => {
          if (Array.isArray(row?.[att])) {
            return null;
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
        <td className={styles('w-max', 'flex', 'space-x-3')}>
          <IconInfoCircle className="cursor-pointer" size={28} color="green" />
          <IconEditCircle className="cursor-pointer" size={28} color="orange" />
          <IconCircleX className="cursor-pointer" size={28} color="red" />
        </td>
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
            {attributes
              ?.filter((att: any) => {
                if (headers) {
                  const attFilter = headers.find((head: any) => head === att);
                  if (attFilter) {
                    return attFilter;
                  }
                } else {
                  return att;
                }

                if (customHeaders) {
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
              .map((head: any, index: any) => (
                <th key={index}>{head}</th>
              ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </TableCore>
    </div>
  );
};

export { Table };
