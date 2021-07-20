import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core'

@Component({
  selector: 'custom-post-title',
  templateUrl: 'custom-post-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomPostTitleComponent {
  @HostBinding('class.custom-post-title') private customPostTitleClass = true
}
