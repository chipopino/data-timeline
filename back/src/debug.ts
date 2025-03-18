

type errorTypes = 'sql' | 'express' | 'fs';

const colors = {
    'defalut': '\x1b[0m',
    'red': '\x1b[31m',
    'yellow': '\x1b[33m',
    'violet': '\x1b[35m',
}

export default function logErr(errType: errorTypes, msg: { title: string, msg: any }[]) {
    console.log(colors.red, 'ERROR START:', colors.defalut);
    console.log(colors.yellow, 'ERROR TYPE:', errType, colors.defalut);
    msg.forEach(e => {
        console.log(colors.violet, e.title, ':', colors.defalut, e.msg);
    })
    console.log(colors.red, 'ERROR END');
}