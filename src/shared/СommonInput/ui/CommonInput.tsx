import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import type { Validation } from '../../../utils/validator';
import { Validator } from '../../../utils/validator';
import './common-input.scss';
import { Paragraph } from '../../Paragraph';

export interface CommonInputRef {
  value?: string;
  isDirty?: boolean;
  isValueHidden?: boolean;
  isError?: boolean;
}

export interface InputPropsI {
  initialValue: string;
  type?: string;
  validations?: Validation[] | [];
  name: string;
  label: string;
  mask?: (value: string) => string;
  placeholder?: string;
  className?: string;
  filled?: boolean;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  ref: CommonInputRef;
}

export const CommonInput = forwardRef<CommonInputRef, InputPropsI>(
  (props, ref) => {
    const {
      initialValue,
      type = 'text',
      className,
      validations = [],
      name,
      filled = false,
      label,
      mask = null,
      placeholder,
      onChange,
    } = props;
    // Служебный ref для самого <input/>
    const inputEl = useRef<HTMLInputElement | null>(null);

    const [value, setValue] = useState<string>(initialValue);
    const isDirty = useRef(false);
    const isValueHidden = useRef(true);
    const errors = useRef<object>({});
    const isError = useRef(false);

    useImperativeHandle(ref, () => {
      return {
        isDirty: isDirty.current,
        isError: isError.current,
        value,
        isValueHidden: isValueHidden.current,
      };
    }, [value]);

    const dynamicType = useMemo(() => {
      if (type !== 'password') {
        return type;
      }
      return isValueHidden ? 'password' : 'text';
    }, [type, isValueHidden]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
      isDirty.current = true;
      errors.current = {};
      validations.forEach((validation: Validation) => {
        const isError = Validator[validation.name](
          ...[e.target.value, validation.params],
        );
        if (isError) {
          errors.current[validation.name] = validation.message;
        }
      });
      isError.current = Object.values(errors.current).length !== 0;
      if (mask) {
        setValue(mask(e.target.value));
      } else {
        setValue(e.target.value);
      }
      // ToDo Убрать этот костыль
      setTimeout(() => onChange?.(e), 0);
    };

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
          ref={inputEl}
          type={dynamicType}
          name={name}
          placeholder={placeholder}
          className={`CommonInputWrapper__input input ${value ? 'input_filled' : ''}`}
          value={value}
          disabled={filled}
          onChange={changeHandler}
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
