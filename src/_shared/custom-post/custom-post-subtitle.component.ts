import {
  Component,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core'

@Component({
  selector: 'custom-post-subtitle',
  templateUrl: 'custom-post-subtitle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomPostSubitleComponent {
  @HostBinding('class.custom-post-subtitle') private customPostSubtitleClass = true
}
