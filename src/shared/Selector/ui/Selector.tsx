import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import './selector.scss';
import { Paragraph } from '../../Paragraph';
import { iconMap } from '../../../utils/iconMap';

type Option = {
  key: string;
  value: string;
};

type SelectorProps = {
  label: string;
  options: Option[];
  onChange?: () => void;
};

export type SelectorRef = {
  value: string;
};

export const Selector = forwardRef<SelectorRef, SelectorProps>(
  ({ label, options, onChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Option | null>(null);
    const internalRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => {
      return {
        value: selected?.key || '',
      };
    }, [selected]);

    const handleSelect = (option: Option) => {
      setSelected(option);
      setIsOpen(false);
      setTimeout(() => onChange?.(), 0);
    };

    return (
      <div className="selector">
        <div
          className="selector__label"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Paragraph level={2}>{label}</Paragraph>
          <button
            className={`selector__button ${isOpen ? 'selector__button_open' : ''}`}
          >
            <img
              src={iconMap.select}
              alt="select"
            />
          </button>
        </div>
        {isOpen && (
          <ul className="selector__list">
            {options.map((option) => (
              <li
                key={option.key}
                className="selector__item"
                onClick={() => handleSelect(option)}
              >
                {option.value}
                {selected?.key === option.key && (
                  <img
                    src={iconMap.check}
                    alt="select"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
        <input
          type="hidden"
          ref={internalRef}
          value={selected?.key || ''}
        />
      </div>
    );
  },
);
