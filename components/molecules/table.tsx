import { styles } from '@libs';
import { Table as TableCore, SimpleGrid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconInfoCircle, IconEditCircle, IconCircleX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface ITable {
  headers?: string[];
  hideHeaders?: string[];
  hideActions?: Array<'detail' | 'edit' | 'delete'>;
  hideAllActions?: boolean;
  columns?: Array<{ label: string; value?: any }>;
  data?: any[];
  // height?: number;
  handleUpdate?: any;
  handleDelete?: { service: (e: any) => void; params: any };
  invalidate?: () => void;
  [key: string]: any;
}

const Table = ({
  headers,
  hideHeaders,
  hideActions,
  hideAllActions,
  columns,
  data,
  handleUpdate,
  handleDelete,
  invalidate
}: ITable) => {
  const [attributes, setAttributes] = useState<string[]>();
  const [columsAtt, setColumnsAtt] = useState<string[]>();

  useEffect(() => {
    data?.map((row: any) => {
      setAttributes(Object.keys(row));
    });
  }, [data]);

  useEffect(() => {
    setColumnsAtt(columns?.map((row: any) => row.value));
  }, [columns]);

  const columnsAttRows = data?.map((row: any, index: number) => {
    return (
      <tr key={index}>
        {columsAtt?.map((att: string, index: number) => (
          <td key={index}>{row?.[att] ? row?.[att] : att !== '' ? att : ''}</td>
        ))}
        {!hideActions?.includes('detail')
        || !hideActions?.includes('edit')
        || !hideActions?.includes('delete') ? (
          <td className={styles('w-max', 'flex', 'space-x-3')}>
            {!hideActions?.includes('detail') && (
              <IconInfoCircle className="cursor-pointer" color="green" size={28} />
            )}
            {!hideActions?.includes('edit') && (
              <IconEditCircle className="cursor-pointer" color="orange" size={28} />
            )}
            {!hideActions?.includes('delete') && (
              <IconCircleX className="cursor-pointer" color="red" size={28} />
            )}
          </td>
        ) : null}
      </tr>
    );
  });

  const handleDeleteSubmit = async (row: any) => {
    console.log(row?.[handleDelete?.params]);
    try {
      const response: any = await handleDelete?.service(row?.[handleDelete?.params]);
      if (response.status === 200) {
        console.log(response);
        invalidate && (await invalidate());
        await notifications.show({
          title: 'Berhasil',
          message: 'Berhasil Delete',
          color: 'green'
        });
      } else {
        console.error(response);
        await notifications.show({
          title: 'Gagal',
          message: 'Gagal Delete',
          color: 'red'
        });
      }
    } catch (error: any) {
      console.error(error);
      await notifications.show({
        title: 'Gagal',
        message: 'Gagal Delete',
        color: 'red'
      });
    }
  };

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
            <td className="max-w-[200px] break-words" key={attIndex}>
              {row?.[att]}
            </td>
          );
        })}
        {!hideActions?.includes('detail')
        || !hideActions?.includes('edit')
        || !hideActions?.includes('delete') ? (
          <td className={styles('h-full')}>
            <div className={styles('flex items-center justify-center', 'space-x-3')}>
              {!hideActions?.includes('detail') && (
                <IconInfoCircle className="cursor-pointer" color="green" size={28} />
              )}
              {!hideActions?.includes('edit') && (
                <IconEditCircle
                  className="cursor-pointer"
                  color="orange"
                  onClick={handleUpdate}
                  size={28}
                />
              )}
              {!hideActions?.includes('delete') && (
                <IconCircleX
                  className="cursor-pointer"
                  color="red"
                  onClick={() => handleDeleteSubmit(row)}
                  size={28}
                />
              )}
            </div>
          </td>
        ) : null}
      </tr>
    );
  });

  const headCustom = columns
    ?.concat([{ label: 'actions' }])
    .map((att: { label: string; value?: any }, index: number) => {
      return (
        <th className="!text-white" key={index}>
          {att.label}
        </th>
      );
    });

  const headDefault = attributes
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
        const attHideFind = hideHeaders?.find((head: any) => head === attHide);
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
      if (hideAllActions) {
        return item !== 'actions';
      } else {
        return item;
      }
    })
    .map((head: any, index: any) => (
      <th className="!text-white" key={index}>
        {head}
      </th>
    ));

  return (
    <SimpleGrid className="relative overflow-x-auto">
      <div style={{ maxHeight: '475px', overflowY: 'scroll' }}>
        <TableCore striped withBorder withColumnBorders>
          <thead className="sticky bg-[#4E498D]" style={{ position: 'sticky', top: 0 }}>
            <tr className="!text-white">{columns ? headCustom : headDefault}</tr>
          </thead>
          <tbody>{columns ? columnsAttRows : rows}</tbody>
        </TableCore>
      </div>
    </SimpleGrid>
  );
};

export { Table };
