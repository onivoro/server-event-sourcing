import { DynamicModule, Module } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { inToken } from './in.token';
import { outToken } from './out.token';

const stdout = new Subject();
const stdin = new Subject();

@Module({
    exports: [outToken, inToken]
})
export class EventSourcingModule {
    static forRoot(outbound?: Subject<any>, inbound?: Observable<any>, byLine=true): DynamicModule {
        const ioStreams = [
            { provide: inToken, useValue: inbound || EventSourcingModule.bindToProcessStdin(byLine) },
            { provide: outToken, useValue: outbound || stdout }
        ];

        return {
            module: EventSourcingModule,
            providers: ioStreams,
            exports: ioStreams
        };
    }

    private static bindToProcessStdin(byLine = false) {

        process.stdin.on('data', d => stdin.next((
            byLine
                ? d?.toString().split('\n')[0]
                : (d as any)?.toString()))
        );

        return stdin;
    }
}