import React, { forwardRef } from 'react';
import { iconMap } from '../../../utils/iconMap';
import './checkbox.scss';
import type { CheckboxPropsI, CheckboxRef } from '../model';
import { useCheckbox } from '../api';

export const Checkbox = forwardRef<CheckboxRef, CheckboxPropsI>(
  (props, ref) => {
    const { onClick = null } = props;
    const { handleClick, checkboxRef, isChecked } = useCheckbox(ref, onClick);

    return (
      <button
        className="checkbox"
        onClick={handleClick}
        ref={checkboxRef}
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
