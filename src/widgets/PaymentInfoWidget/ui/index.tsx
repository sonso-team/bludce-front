import React, { forwardRef } from 'react';
import type { CommonInputRef } from '../../../shared/СommonInput';
import { CommonInput } from '../../../shared/СommonInput';
import './payment-info-widget.scss';

interface IPaymentInfoWidgetProps {
  finalAmount: number;
  personAmount: number;
  tipsAmount?: number;
  withoutTips?: boolean;
  onChange?: () => void;
  ref?: CommonInputRef;
}

export const PaymentInfoWidget = forwardRef<
  CommonInputRef,
  IPaymentInfoWidgetProps
>((props, ref) => {
  const {
    finalAmount,
    personAmount,
    tipsAmount,
    onChange,
    withoutTips = false,
  } = props;

  return (
    <div className="PaymentInfoWidget">
      <CommonInput
        initialValue={`${finalAmount}р.`}
        label="Cумма чека"
        name="finalAmount"
        filled
      />
      {!withoutTips &&
        (tipsAmount ? (
          <CommonInput
            initialValue={`${tipsAmount}р.`}
            label="Чаевые"
            name="tipsAmount"
            filled
          />
        ) : (
          <CommonInput
            initialValue=""
            label="Чаевые"
            name="tipsAmount"
            placeholder="Введите сумму"
            validations={[
              {
                name: 'isEmpty',
                message: 'Поле не должно быть пустым',
              },
            ]}
            ref={ref}
            onChange={onChange}
          />
        ))}
      <CommonInput
        initialValue={`${personAmount + tipsAmount}р.`}
        label="Сумма на человека"
        name="personAmount"
        filled
      />
    </div>
  );
});
