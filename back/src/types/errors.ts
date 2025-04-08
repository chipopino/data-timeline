export type errorIds =
    'sql' | 'express' | 'fs' | 'csvFormat' |
    'csvParse' | 'emptySet'
    ;

// {id: client message} key pairs
// leave empty string for the default generic message 
export const clientMsgs: Record<errorIds, string> = {
    sql: '',
    express: '',
    fs: '',
    csvFormat: 'Invalid csv format',
    csvParse: 'Could not parse csv file',
    emptySet: 'empty set not allowed',
};
