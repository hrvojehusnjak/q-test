import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'custom-loading',
  templateUrl: 'custom-loading.component.html',
  styleUrls: ['custom-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomLoadingComponent {}
