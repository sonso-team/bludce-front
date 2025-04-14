import React, { useRef } from 'react';
import './home-page.scss';
import type { InputRef } from '../../shared/Input';
import { Input } from '../../shared/Input';
import { Heading } from '../../shared/Heading';

const HomePage: React.FC = () => {
  const inputRef = useRef<InputRef>(null);
  return (
    <div className="HomePage">
      <Heading level={2}>БЛЮДЦЕ</Heading>
      <Input
        placeholder="Имя"
        name="name"
        initialValue=""
        validations={[
          {
            name: 'isEmpty',
            message: 'Введите корректные данные',
          },
        ]}
        ref={inputRef}
      />
      <Input
        placeholder="Почта"
        name="name"
        initialValue=""
        validations={[]}
        ref={inputRef}
      />
      <Input
        placeholder="Номер телефона"
        name="name"
        initialValue=""
        validations={[]}
        ref={inputRef}
      />
    </div>
  );
};

export default HomePage;
