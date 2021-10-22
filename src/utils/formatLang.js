export function formatLang(lang) {
  const isIdHyphenated = lang.includes('-')
  if (isIdHyphenated) {
    const splitted = lang.split('-')
    const language = splitted[0] + '-' + splitted[1].toUpperCase()
    return language
  } else {
    return lang.id
  }
}
