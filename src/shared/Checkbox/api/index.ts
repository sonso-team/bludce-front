import { useImperativeHandle, useRef, useState } from 'react';

export const useCheckbox = (ref, onClick) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const checkboxRef = useRef<HTMLButtonElement | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      isChecked,
    }),
    [isChecked],
  );

  const handleClick = (e) => {
    setIsChecked((prev) => !prev);
    // ToDo Убрать этот костыль
    setTimeout(() => onClick?.(e), 0);
  };

  return {
    handleClick,
    checkboxRef,
    isChecked,
  };
};
