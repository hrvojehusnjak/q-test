import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core'

@Component({
  selector: 'custom-post',
  exportAs: 'customPost',
  templateUrl: 'custom-post.component.html',
  styleUrls: ['custom-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomPostComponent {
  @HostBinding('class.custom-post') private customPostClass = true
}
