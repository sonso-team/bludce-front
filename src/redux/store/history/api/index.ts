import { formatDate } from '../../../../utils/dateFormat';
import type { Bill } from '../../bill/types';
import type { HistoryItem } from '../../../../components/HistoryItem/model';

//перенести куда-нибудь? а куда?
export const mapBillsToHistory = (bills: Bill[]): HistoryItem[] => {
  return bills.map((bill) => ({
    id: bill.receiptId,
    date: formatDate(bill.createdAt),
    billNumber: bills.indexOf(bill) + 1,
  }));
};
