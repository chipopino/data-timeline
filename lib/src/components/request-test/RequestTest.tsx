import React, { useRef, useState } from 'react';
import { usePost } from 'hooks/useFetch';
import { Btn } from 'components/ui/buttons/btn/Btn';

import * as t from 'src/requests/root';
import { Loader } from 'components/ui/loader/Loader';


export function RequestTest() {

    const { post, isError, isLoading, isSuccess } = usePost();

    function onClick() {
        post(t.test.path, { test: '1' }, { poop: 'true' })
            .then(res => {
                console.log("WWWWWWWWWWWWWWWWWW")
                console.log("AAAAAAA", res);
            }).catch(err => {
                console.log("QQQQQQQQQQQQQQQQQQ")
                console.log("POOP", err)
            })
    };

    return (
        <div className='flex gap-4'>
            <Btn onClick={onClick}>post: {t.test.path}</Btn>
            {isLoading && <Loader />}
            {isError && <span>error</span>}
            {isSuccess && <span>success</span>}
        </div>
    );
};