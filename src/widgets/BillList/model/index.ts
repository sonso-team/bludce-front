import type { IBillStateItem } from '../../../redux/store/lobby/types';
import type { BillItem } from '../../../redux/store/bill/types';

export interface IBillListProps {
  billItems: IBillStateItem[];
  isEditable?: boolean;
  isLiveTime?: boolean;
  onPick?: (item: IBillStateItem, index: number) => void;
  myId?: string;
  isIniciatorView?: boolean;
}

export interface IBillRowProps {
  item: BillItem;
  isEditable: boolean;
  index: number;
  onClick?: () => void;
  mode?: string;
  isIniciatorView?: boolean;
}

export interface IEditButtonsProps {
  isEditing: boolean;
  deleteHandle: () => unknown;
  editHandle: () => unknown;
}
