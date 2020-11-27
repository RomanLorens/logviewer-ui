import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CommonService } from '../services/common.service';
import { TailLog } from '../tail-logs/tail-log';

export class ErrorDataSource implements DataSource<any> {

    private dataSubject = new BehaviorSubject<any[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    public total$ = this.totalSubject.asObservable();

    constructor(private service: CommonService) { }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.dataSubject.asObservable()
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete()
    }

    fetch(log: TailLog) {
        this.service.errors(log).pipe(
            catchError((err) => {
                console.error(err)
                return of([])
            }),
            finalize(() => { })
        ).subscribe(d => {
            this.dataSubject.next(d['errors'])
            this.totalSubject.next(d['pagination'].total)
        })
    }

}