const path = require('path')

module.exports = {
  i18n: {
    locales: ['en', 'th'],
    defaultLocale: 'th',
    localePath: path.resolve('./public/locales'),
  },
}
