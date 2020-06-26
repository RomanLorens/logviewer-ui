import { OnDestroy } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs';


export class UnsubscribeComponent implements OnDestroy {

    protected subscription: Subscription;

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}