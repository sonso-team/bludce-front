import React, { forwardRef } from 'react';
import './common-input.scss';
import { Paragraph } from '../../Paragraph';
import type { CommonInputPropsI, CommonInputRef } from '../model';
import { useCommonInput } from '../api';

export const CommonInput = forwardRef<CommonInputRef, CommonInputPropsI>(
  (props, ref) => {
    const { className, name, filled = false, label, placeholder } = props;
    const {
      handleChange,
      dynamicType,
      value,
      isDirty,
      commonInputRef,
      errors,
    } = useCommonInput(ref, props);

    return (
      <div
        className={`CommonInputWrapper ${className || ''} ${isDirty.current && Object.values(errors.current).length ? 'CommonInputWrapper_invalid' : ''}`}
      >
        <label
          htmlFor={name}
          className={'CommonInputWrapper__label label'}
        >
          {label}:
        </label>
        <input
          ref={commonInputRef}
          type={dynamicType}
          name={name}
          placeholder={placeholder}
          className={`CommonInputWrapper__input input ${value ? 'input_filled' : ''}`}
          value={value}
          disabled={filled}
          onChange={handleChange}
        />
        {isDirty.current && Object.values(errors.current).length !== 0 && (
          <Paragraph
            level={4}
            mode="error"
            className={'CommonInputWrapper__error'}
          >
            {Object.values(errors.current)?.[0]}
          </Paragraph>
        )}
      </div>
    );
  },
);
