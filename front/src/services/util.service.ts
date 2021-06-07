export function validateUrl(str: string): boolean {
  const emailRegEx = /^http(s)?:\/\/(\S)+\.\w+(\.[\w])*(\/|\w)*$/g

  return emailRegEx.test(str);
}

export function getFilenameFromHeader(header: string | null, filetype?: string): string {
  if (!header) {
    return `noname.${filetype}`;
  }

  const parts = header.split('filename=');
  if (parts && parts.length > 0) {
    return parts[1].replaceAll(/"/g, '');
  } else {
    return `noname.${filetype}`;
  }
}
