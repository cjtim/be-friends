const path = require('path')

module.exports = {
  i18n: {
    locales: ['en', 'th'],
    defaultLocale: 'en',
    localePath: path.resolve('./public/locales'),
  },
}
