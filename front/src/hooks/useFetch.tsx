import { useState } from 'react';
import { post } from 'shared/methods';


type fetchState = 'idle' | 'loading' | 'success' | 'error';


// TODO: get
// export function useGet({ endpoint, mock }: getProps) {

//   const [state, setState] = useState<state>('idle');

//   return {
//     get: new Promise((res, rej) => {
//       setState('loading');
//       get(endpoint, mock).then(result => {
//         setState('success');
//         res(result);
//       }).catch(err => {
//         setState('error');
//         console.log(err);
//       })
//     }),
//     setFetchState: (state: state) => setState(state),
//     isLoading: state === 'loading',
//     isError: state === 'error',
//     isSuccess: state === 'success',
//     isIdle: state === 'idle',
//   }
// }


export function usePost() {

  const [state, setState] = useState<fetchState>('idle');
  
  function Post(
    endpoint: string,
    data: object | File,
    mock?: object
  ) {
    return new Promise((res, rej) => {
      setState('loading');
      post(endpoint, data, mock).then(result => {
        setState('success');
        res(result);
      }).catch(err => {
        setState('error');
      })
    })
  }

  return {
    post: Post,
    setFetchState: (state: fetchState) => setState(state),
    isLoading: state === 'loading',
    isError: state === 'error',
    isSuccess: state === 'success',
    isIdle: state === 'idle',
  }
}
