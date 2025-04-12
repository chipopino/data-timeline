import urlJoin from "url-join";
import classNames from "classnames";
import { MOCK } from "shared/constants";

export function cn(...args: (string | undefined | null | false)[]): string {
  return classNames(...args);
}

export function isT() {
  if (typeof window !== "undefined") {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }
}

async function fetchWrapper(callback: (res: any, rej: any) => void, mock: any) {
  return new Promise((res, rej) => {
    if (process.env.DEV && MOCK.USE_MOCK) {
      setTimeout(() => {
        if (MOCK.IS_FETCH_ERROR) {
          rej("mock error");
        } else {
          res(mock);
        }
      }, MOCK.FETCH_TIMEOUT);
    } else {
      callback(res, rej);
    }
  });
}

// TODO: get
// export async function get(endpoint: string, mock: any) {

//     function callback(res: any, rej: any) {
//         fetch(urlJoin(process.env.FETCH_URL || '', endpoint))
//             .then((res) => res.json())
//             .then((data) => res(data))
//             .catch((err) => rej(err));
//     }

//     return fetchWrapper(callback, mock);
// };

export async function post(endpoint: string, data: object, mock: any) {
  function callback(res: any, rej: any) {
    fetch(urlJoin(process.env.FETCH_URL || "", endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (result) => {
        try {
          const data = await result.json();
          if (!result.ok) {
            // status != 200
            if (data.clientMsg) {
              // error with message to the client
              rej(data.clientMsg);
            } else {
              // error without message to the client
              rej("");
            }
          } else {
            // status = 200
            res(data);
          }
        } catch (err) {
          // failed to parse json
          // TODO: remove log
          console.log("ERROR 236523437: failed to parse json");
          rej("");
        }
      })
      .catch((err) => {
        // network or other fetch-related errors
        // TODO: remove log
        console.log("ERROR 132957617395627835:", err);
        rej("");
      });
  }

  return fetchWrapper(callback, mock);
}
