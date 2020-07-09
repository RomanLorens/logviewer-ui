import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-stats-error-dialog',
    templateUrl: 'stats-error.component.html',
})
export class StatsErrorComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<StatsErrorComponent>
    ) {
    }

    close() {
        this.dialogRef.close();
    }
}
