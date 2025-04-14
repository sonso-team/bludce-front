import type { FormEventHandler } from 'react';

export interface CheckboxRef {
  isChecked: boolean;
}

export interface CheckboxPropsI {
  onClick?: FormEventHandler<HTMLButtonElement>;
  ref?: CheckboxRef;
}
