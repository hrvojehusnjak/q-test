import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PostsIndexComponent } from './posts-index/posts-index.component'
import { PostsDetailComponent } from './posts-detail/posts-detail.component'
import { PostsListComponent } from './posts-index/posts-list/posts-list.component'
import { PostsRoutingModule } from './posts-routing.module'
import { CustomPostModule } from 'src/_shared/custom-post/custom-post.module'
import { HighlightSearchTermsPipe } from './posts-index/posts-list/highlight-search-terms.pipe'
import { CustomLoadingModule } from 'src/_shared/custom-loading/custom-loading.module'
import { CustomCommentsListModule } from 'src/_shared/custom-comments-list/custom-comments-list.module'

@NgModule({
  declarations: [
    PostsIndexComponent,
    PostsDetailComponent,
    PostsListComponent,
    HighlightSearchTermsPipe
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    CustomPostModule,
    CustomCommentsListModule,
    CustomLoadingModule
  ]
})
export class PostsModule {}
