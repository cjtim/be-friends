import moment from 'moment'

// eslint-disable-next-line import/prefer-default-export
export const ParseDateTime = (d: Date) => moment(d).format('D/M/YYYY H:mm')
