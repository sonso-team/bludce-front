import type React from 'react';
import type { Validation } from '../../../utils/validator';

export interface CommonInputRef {
  value?: string;
  isDirty?: boolean;
  isValueHidden?: boolean;
  isError?: boolean;
}

export interface CommonInputPropsI {
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
