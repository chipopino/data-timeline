import urlJoin from "url-join";
import classNames from 'classnames';

export function cn(...args: (string | undefined | null | false)[]): string {
    return classNames(...args);
}

export function isT() {
    if (typeof window !== 'undefined') {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
}
export async function fetchData(endpoint: string, mock: any, isError?: boolean, timeout?: number) {
    return new Promise((resolve, reject) => {
        if (process.env.DEV) {
            setTimeout(() => {
                if (isError) {
                    reject("mock error");
                } else {
                    resolve(mock);
                }
            }, timeout || 500)
        } else {
            fetch(urlJoin(process.env.FETCH_URL || '', endpoint))
                .then(res => res.json())
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    reject(err);
                })
        }
    });
};
