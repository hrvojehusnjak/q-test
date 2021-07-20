import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  Input
} from '@angular/core'
import { Comment } from 'src/core/models/models'

@Component({
  selector: 'custom-comment',
  templateUrl: 'custom-comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomCommentComponent {
  @Input() comment!: Comment
  @Input() headerText?: string
  @HostBinding('class.custom-comment')
  private customCommentClass = true
}
