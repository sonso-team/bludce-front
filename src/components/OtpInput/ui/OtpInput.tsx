import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
} from 'react';
import './otp-input.scss';

export type OTPInputRef = {
  value: string;
  isValid: boolean;
};

export type OTPInputProps = {
  length?: number;
  onChange: (event?: React.ChangeEvent<HTMLInputElement>) => void;
};

export const OtpInput = forwardRef<OTPInputRef, OTPInputProps>(
  ({ length = 6, onChange }, ref) => {
    const [values, setValues] = useState<string[]>(Array(length).fill(''));
    const inputsRef = useRef<HTMLInputElement[]>([]);

    useImperativeHandle(ref, () => ({
      value: values.join(''),
      isValid: values.every((v) => v !== ''),
    }));

    const handleChange = (index: number, value: string) => {
      if (!/^\d?$/.test(value)) {
        return;
      }

      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      // Переход к следующему инпуту или снятие фокуса с последнего
      if (value) {
        if (index < length - 1) {
          inputsRef.current[index + 1]?.focus();
        } else {
          inputsRef.current[index]?.blur();
        }
      }

      setTimeout(() => {
        onChange?.();
      }, 0);
    };

    const handleKeyDown = (
      index: number,
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === 'Backspace') {
        if (values[index] === '' && index > 0) {
          const newValues = [...values];
          newValues[index - 1] = '';
          setValues(newValues);
          inputsRef.current[index - 1]?.focus();
        }
      }
    };

    useEffect(() => {
      inputsRef.current[0]?.focus();
    }, []);

    return (
      <div className="OtpInput">
        {values.map((value, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) {
                inputsRef.current[index] = el;
              }
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="OtpInput__input"
          />
        ))}
      </div>
    );
  },
);
