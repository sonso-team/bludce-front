import React, { useEffect, useState } from 'react';
import type { OverrideContentPropsI } from '../../../HOC/ModalProvider/types';
import { iconMap } from '../../../utils/iconMap';
import { Paragraph } from '../../../shared/Paragraph';
import { Button } from '../../../shared/Button';

export const ShareLinkModalBody: React.FC<OverrideContentPropsI> = ({
  ...props
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const link = `https://bank.uwu-devcrew.ru/lobby/${props.receiptId}`;
  const copyHandler = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  const closeHandler = () => {
    setCopied(false);
    props.closeHandler();
  };
  return (
    <div className="LobbyPage__modal">
      <button
        className="LobbyPage__modal-cross"
        onClick={closeHandler}
      >
        <img
          src={iconMap.cross}
          alt="cross"
        />
      </button>
      <Paragraph level={2}>Ваша ссылка</Paragraph>
      <div className="LobbyPage__linkBlock">
        <a className="LobbyPage__link">{link}</a>
      </div>
      <Button
        onClick={copyHandler}
        className="LobbyPage__modal-btn"
        disabled={copied}
      >
        {copied ? 'Скопировано' : 'Поделиться'}
      </Button>
    </div>
  );
};
