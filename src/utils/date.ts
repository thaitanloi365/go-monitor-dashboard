import moment from 'moment';
import momentTZ from 'moment-timezone';

export function formatDate(date: string | Date | number, format = 'MMM, DD YYYY HH:mm z') {
  let d = moment(date);
  if (typeof date === 'number') {
    if (date < 1526400) {
      return '';
    }
    d = moment.unix(date);
  }

  if (!d.isValid()) {
    return '';
  }
  return d.utc(false).format(format);
}

export function formatBirthday(birthday: string) {
  const d = moment(birthday, 'YYYY-MM-DD');

  if (!d.isValid()) {
    return '';
  }

  return d.format('MMM, DD YYYY');
}

export function currentTimezone() {
  return momentTZ.tz.guess(true);
}
export default moment;
