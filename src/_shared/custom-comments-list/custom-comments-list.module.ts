import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CustomCommentsListComponent } from './custom-comments-list.component'
import { CustomCommentComponent } from './custom-comment.component'

@NgModule({
  imports: [CommonModule],
  declarations: [CustomCommentsListComponent, CustomCommentComponent],
  exports: [CustomCommentsListComponent]
})
export class CustomCommentsListModule {}
