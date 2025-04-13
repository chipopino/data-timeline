import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { MainModal } from "components/modals/main/MainModal";

interface MainContextType {
  m: {
    resolve: any;
    reject: any;
    setResRej: any;
    setTsx: (content?: ReactNode) => void;
  };
}

const MainContext = createContext<MainContextType | undefined>(undefined);

export const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<ReactNode | null>(null);
  const [dspModal, setDspModal] = useState<boolean>(false);
  const [res, setRes] = useState<null | ((v: any) => void)>(null);
  const [rej, setRej] = useState<null | ((e?: any) => void)>(null);

  const setResRej = useCallback((resFn: typeof res, rejFn: typeof rej) => {
    // @ts-ignore
    setRes(() => (value) => {
      setModalContent();
      resFn?.(value);
    });
    // @ts-ignore
    setRej(() => (value) => {
      setModalContent();
      rejFn?.(value);
    });
  }, []);

  function setModalContent(content?: ReactNode) {
    if (content) {
      setDspModal(true);
      setModal(content);
    } else {
      setDspModal(false);
      setTimeout(() => {
        setModal(null);
      }, 300); // needs to be the same as the MainModal opacity transition
    }
  }

  return (
    <MainContext.Provider
      value={{
        m: {
          setTsx: setModalContent,
          resolve: res,
          reject: rej,
          setResRej: setResRej,
        },
      }}
    >
      {children}
      <MainModal
        modalContent={modal}
        setModalContent={setModalContent}
        dspModal={dspModal}
      />
    </MainContext.Provider>
  );
};

export function useCtx(): MainContextType {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within an AppProvider");
  }
  return context;
}
