export default (a, b) => {
  const timeA = a.createdAt;
  const timeB = b.createdAt;
  if (timeA < timeB) { return -1; }
  if (timeA > timeB) { return 1; }
  return 0;
}
