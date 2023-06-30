import { Button, Modal, Text } from '@mantine/core';
import { useState } from 'react';

interface ModalValidationProps {
  onClick?: any;
  [key: string]: any;
}

const ModalValidation = ({ onClick }: ModalValidationProps) => {
  const [opened, setOpened] = useState<boolean>(false);

  const onOpen = () => setOpened(true);
  const onClose = () => setOpened(false);

  return (
    <div>
      <Modal
        centered
        onClose={onClose}
        opened={opened}
        size={600}
        withCloseButton={false}>
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <Text fw={700} fz={20} lh={'30px'}>
              Apakah Anda yakin ingin mengapus user ini!
            </Text>
          </div>
          <div className="flex items-center space-x-5">
            <Button
              className="w-full bg-[#E5E7EB] text-black"
              onClick={onClose}
              variant="white">
              Batal
            </Button>
            <Button
              className="w-full bg-[#DC2626] text-white"
              onClick={async () => {
                if (onClick) {
                  await onClick();
                  await onClose();
                }
              }}
              variant="white">
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      <Button onClick={onOpen} variant="white">
        <Text
          className="cursor-pointer px-[15px]"
          color="#DC2626"
          fw={300}
          fz={14}
          lh={'20px'}>
          Delete
        </Text>
      </Button>
    </div>
  );
};

export { ModalValidation };
