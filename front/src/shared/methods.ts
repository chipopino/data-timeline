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

async function fetchWrapper<T>(
  callback: (res: (value: any) => void, rej: (reason?: any) => void) => void,
  mock?: any
): Promise<T> {
  return new Promise<T>((res, rej) => {
    if (process.env.DEV && MOCK.USE_MOCK) {
      setTimeout(() => {
        if (MOCK.IS_FETCH_ERROR) {
          rej("mock error");
        } else {
          res(mock || {});
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

export async function post<reqT, resT>(endpoint: string, data: reqT, mock?: reqT): Promise<resT> {
  function callback(res: (value: any) => void, rej: (reason?: any) => void) {
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
            rej(data.clientMsg || "");
          } else {
            res(data);
          }
        } catch (err) {
          console.log("ERROR 236523437: failed to parse json");
          rej("");
        }
      })
      .catch((err) => {
        console.log("ERROR 132957617395627835:", err);
        rej("");
      });
  }

  return fetchWrapper<resT>(callback, mock);
}