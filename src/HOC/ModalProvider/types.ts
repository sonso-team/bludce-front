import type { ReactNode, ReactElement } from 'react';

export interface ModalProviderPropsI {
  children: ReactNode;
}

export interface OverrideContentPropsI {
  closeHandler?: () => void;
  [key: string]: unknown;
}

export interface ModalConfigI {
  icon?: string;
  title?: string;
  body?: ReactElement | string;
  primaryText?: string;
  secondaryText?: string;
  primaryHandler?: () => void;
  secondaryHandler?: () => void;
  closeOutside?: boolean;
  overrideContent?: ReactElement;
}

export interface ModalProviderContextI {
  showModal: (config: ModalConfigI) => void;
  hideModal: () => void;
}
