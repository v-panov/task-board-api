export function parseErrors(error) {
  return Object.keys(error).map(key => ({ [key]: error[key].message }));
}
