import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core'
import { Comment } from 'src/core/models/models'

@Component({
  selector: 'custom-comments-list',
  templateUrl: 'custom-comments-list.component.html',
  styleUrls: ['custom-comments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CustomCommentsListComponent {
  @Input() set comments(value: Comment[]) {
    this.allComments = value
    this.availableComments = this.limitNumber
      ? value.slice(0, this.limitNumber)
      : value
  }
  @Input() headerText?: string
  @Input() limitNumber?: number
  @HostBinding('class.custom-comments-list')
  private customCommentsListClass = true

  public allComments: Comment[] = []
  public availableComments: Comment[] = []

  showMoreComments(): void {
    const sliceEnd = this.availableComments.length + (this.limitNumber || 0)
    this.availableComments = this.allComments.slice(0, sliceEnd)
  }
}
