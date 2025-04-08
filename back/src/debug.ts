import { errorIds, clientMsgs } from '@/types/errors';

const colors = {
    'default': '\x1b[0m',
    'red': '\x1b[31m',
    'yellow': '\x1b[33m',
    'violet': '\x1b[35m',
}

export default function logErr(
    errId: errorIds,
    msg: { title: string, msg: any }[]
) {
    console.log(colors.red, 'ERROR START:', colors.default);
    console.log(colors.yellow, 'ERROR TYPE:', errId, colors.default);
    msg.forEach(e => {
        console.log(colors.violet, e.title, ':', colors.default, e.msg);
    })
    console.log(colors.red, 'ERROR END');
    console.log(colors.default);
}


export class Err extends Error {
    clientMsg: string;
    constructor(
        public id: errorIds,
        public serverMsg?: any,
        public serverMsgs?: { title: string, msg: any }[]
    ) {
        super(id);
        this.name = id;
        this.clientMsg = clientMsgs[id] || 'An unexpected error occurred';
        this.serverMsg = serverMsg;
        this.serverMsgs = serverMsgs;
    }
}
