export function parseUrlParameters(url) {
  const params = {};
  const urlParts = url.split("?");
  if (urlParts.length > 1) {
    const paramString = urlParts[1];
    const paramArray = paramString.split("&");
    paramArray.forEach((param) => {
      const [key, value] = param.split("=");
      params[key] = decodeURIComponent(value);
    });
  }
  return params;
}
