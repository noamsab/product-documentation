import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'gc-disclaimer',
    templateUrl: './disclaimer.component.html',
    styleUrls: ['./disclaimer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisclaimerComponent implements OnInit {
    public isResellerSupportPage = false;

    constructor(private router: Router, private cd: ChangeDetectorRef) {}

    public ngOnInit(): void {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.isResellerSupportPage = this.router.url.includes('/reseller-support');
            this.cd.detectChanges();
        });
    }
}
