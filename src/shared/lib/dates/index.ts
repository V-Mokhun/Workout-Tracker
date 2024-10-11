export const dateWithoutTimezone = (date: Date) => {
  const tzoffset = date.getTimezoneOffset() * 60000;
  const withoutTimezone = new Date(date.valueOf() + Math.abs(tzoffset));
  return withoutTimezone;
};
