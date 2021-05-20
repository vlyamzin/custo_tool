export function validateUrl(str: string): boolean {
  const emailRegEx = /^http(s)?:\/\/(\S)+\.\w+(\.[\w])*(\/|\w)*$/g

  return emailRegEx.test(str);
}
