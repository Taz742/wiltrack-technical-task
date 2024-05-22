import { useMemo } from 'react';
import { useState, useCallback } from 'react';

interface IReturn<T> {
  isOpen: boolean;
  item: T;
  closeModal: () => void;
  openModal: (setItem?: any) => void;
}

const useModal = <T>(initIsOpen = false, initItem = null): IReturn<T> => {
  const [isOpen, setIsOpen] = useState(initIsOpen);
  const [item, setSelectedItem] = useState<any>(initItem);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
    setIsOpen(false);
  }, [setIsOpen]);

  const openModal = useCallback(
    (item = null) => {
      setSelectedItem(item);
      setIsOpen(true);
    },
    [setIsOpen]
  );

  const state = useMemo(() => {
    return {
      isOpen,
      item,
      closeModal,
      openModal,
    };
  }, [isOpen, item, closeModal, openModal]);

  return state;
};

export default useModal;
