// export const URI_ROOT = "http://wonderlandlabs.com/api";
// test

const roots = {
  test: "http://test-wonderlandlabs.com:8080/api",
  development: "http://test-wonderlandlabs.com:8080/api",
  production: "https://wonderland-labs.herokuapp.com/api"
};
const environment = process.env.NODE_ENV || 'production';
export const URI_ROOT = roots[environment];
