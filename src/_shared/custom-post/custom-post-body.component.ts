import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core'

@Component({
  selector: 'custom-post-body',
  templateUrl: 'custom-post-body.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomPostBodyComponent {
  @HostBinding('class.custom-post-body') private customPostBodyClass = true
}
