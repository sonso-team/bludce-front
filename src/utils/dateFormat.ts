const months = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
];

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${day} ${month}.`;
};
