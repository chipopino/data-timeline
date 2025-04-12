import React, { useRef, useState } from 'react';
import { usePost } from 'hooks/useFetch';
import { Btn } from 'components/ui/buttons/btn/Btn';

import * as t from 'lib';
import { Loader } from 'components/ui/loader/Loader';

interface props {
  children: React.ReactNode;
  className?: string;
}


export function FileUploadBtn({ children }: props) {

  const { post, isError, isLoading } = usePost();

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    post(t.test.path, { test: 1 }, {})
      .then(res => {
        console.log("AAAAAAA", res);
      })
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <Btn onClick={handleButtonClick}>{children}</Btn>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {isLoading && <Loader />}
      {/* {isError && <Error />} */}
    </div>
  );
};
