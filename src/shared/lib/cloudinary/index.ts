export function getPublicIdFromUrl(url: string) {
  const regex = /\/image\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]*$|$)/;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}
