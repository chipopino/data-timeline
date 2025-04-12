import React, { FunctionComponent, ReactNode } from 'react';
import { useCtx } from 'components/context/Context';
import { cn } from "shared/methods";


interface props {
    modalContent: ReactNode;
    setModalContent: (content?: ReactNode) => void;
    dspModal: any;
}

export function MainModal({
    modalContent,
    dspModal
}: props) {

    const { m } = useCtx();

    return <div className={cn(
        'fixed top-0 left-0 z-10',
        'w-full h-full flex-center',
        'transition-opacity duration-300',
        !dspModal && 'opacity-0 pointer-events-none',
    )}>
        <div
            className={cn(
                'w-full h-full',
                'absolute top-0 left-0',
                'bg-secondary opacity-50',
            )}
            onClick={() => {
                m.setTsx();
                m.reject('');
            }}
        />
        <div className={cn(
            'z-10 bg-white',
            'p-4 rounded',
            'max-w-[90%] overflow-hidden',
        )}>
            {modalContent}
        </div>
    </div>
}

export function createModal<P>(Component: FunctionComponent<P>) {
    return function useModal(props: P): () => Promise<any> {
        const { m } = useCtx();
        return () => new Promise((res, rej) => {
            m.setResRej(res, rej);
            //@ts-ignore
            m.setTsx(<Component {...props as P} />);
        });
    };
}