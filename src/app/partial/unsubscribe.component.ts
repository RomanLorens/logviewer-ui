import { OnDestroy, Component } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
    selector: 'app-unsubscribe',
    template: ''
})
export class UnsubscribeComponent implements OnDestroy {

    protected subscription: Subscription;

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}