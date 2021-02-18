import { Subject } from "rxjs";

export const bindToProcessStdin = (stdin: Subject<string>, byLine = false) => {

    process.stdin.on('data', d => stdin.next((
        byLine
            ? d?.toString().split('\n')[0]
            : (d as any)?.toString()))
    );

    return stdin;
}