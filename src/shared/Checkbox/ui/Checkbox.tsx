import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { iconMap } from '../../../utils/iconMap';
import './checkbox.scss';
import type { CheckboxPropsI, CheckboxRef } from '../model';

export const Checkbox = forwardRef<CheckboxRef, CheckboxPropsI>(
  (props, ref) => {
    const { onClick = null } = props;
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const checkboxEl = useRef<HTMLButtonElement | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        isChecked,
      }),
      [isChecked],
    );

    const clickHandler = (e) => {
      setIsChecked((prev) => !prev);
      // ToDo Убрать этот костыль
      setTimeout(() => onClick?.(e), 0);
    };

    return (
      <button
        className="checkbox"
        onClick={clickHandler}
        ref={checkboxEl}
      >
        {isChecked && (
          <img
            src={iconMap.check}
            alt=""
          />
        )}
      </button>
    );
  },
);
