import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PostsDetailComponent } from './posts-detail/posts-detail.component'
import { PostsIndexComponent } from './posts-index/posts-index.component'

const routes: Routes = [
  {
    path: '',
    component: PostsIndexComponent
  },
  {
    path: ':id',
    component: PostsDetailComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
