import { LoadingIndicatorService } from './utils/loading-indicator.service';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router,
  ActivatedRoute
} from '@angular/router';
import { AppConfigService } from './config/app-config.service';
import 'rxjs/add/operator/delay';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  msgs: string;
  title = 'app';
  loading = true;
  constructor(private loadingIndicatorService: LoadingIndicatorService,
    private appConfigService: AppConfigService,
    private router: Router) {
    // for http service loader
    this.loadingIndicatorService.onLoadingChanged.delay(0).subscribe((res) => {
      this.loading = res;
    });
    // for router interception
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
