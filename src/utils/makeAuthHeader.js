
export default (state) => {
  const headers = new Headers();
  headers.append('Auth-token', state.authState.apiToken);
  return headers;
}