import './confirm-personal-data.scss';
import React, { forwardRef } from 'react';
import { Checkbox } from '../../../shared/Checkbox';
import { Paragraph } from '../../../shared/Paragraph';
import type { CheckboxPropsI, CheckboxRef } from '../../../shared/Checkbox';

export const ConfirmPersonalData = forwardRef<CheckboxRef, CheckboxPropsI>(
  (props, ref) => {
    const { onClick } = props;
    return (
      <div className="ConfirmPersonalData">
        <Checkbox
          ref={ref}
          onClick={onClick}
        />
        <Paragraph level={5}>
          Даю согласие на обработку персональных данных
        </Paragraph>
      </div>
    );
  },
);
