export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email || email.length <= 0) return "Email boş olamaz!."
  if (!re.test(email)) return 'Ooops! Geçerli bir Emaile ihtiyazımız var.'
  return ''
}
