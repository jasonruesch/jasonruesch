export const formatDate = (date: number | Date) => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
    .format(date)
    .replace(',', '');
};
