export type errorIds =
    'sql' | 'express' | 'fs' | 'csvFormat' |
    'csvParse' | 'emptySet' | 'zod'
    ;

// this is the default client messages if no client message was specified
// {id: client message} key pairs
// leave empty string for the default generic message 
export const clientMsgs: Record<errorIds, string> = {
    sql: '',
    express: '',
    fs: '',
    csvFormat: 'Invalid csv format',
    csvParse: 'Could not parse csv file',
    emptySet: 'empty set not allowed',
    zod: ''
};
