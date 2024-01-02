import ky from "ky";

const prefixUrl = `${
  process.env.LAUNCHPAD_API_URI
    ? process.env.LAUNCHPAD_API_URI
    : "http://localhost:3005/api/v1"
}/`;

console.log("prefixUrl", prefixUrl);

export const launchpadApi = ky.extend({
  prefixUrl,
  headers: {
    Accept: "application/json",
  },
});
