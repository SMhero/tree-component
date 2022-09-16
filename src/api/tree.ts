import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import data from "./data.json";

const mock = new MockAdapter(axios);

mock.onGet("/tree").reply(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve([200, data]);
      }, 1000);
    }),
);

export const loadTree = () =>
  axios
    .get("/tree")
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
