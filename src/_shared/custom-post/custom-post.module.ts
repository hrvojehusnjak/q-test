import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CustomPostBodyComponent } from './custom-post-body.component'
import { CustomPostSubitleComponent } from './custom-post-subtitle.component'
import { CustomPostTitleComponent } from './custom-post-title.component'
import { CustomPostComponent } from './custom-post.component'

@NgModule({
  imports: [CommonModule],
  declarations: [
    CustomPostComponent,
    CustomPostTitleComponent,
    CustomPostSubitleComponent,
    CustomPostBodyComponent
  ],
  exports: [
    CustomPostComponent,
    CustomPostTitleComponent,
    CustomPostSubitleComponent,
    CustomPostBodyComponent
  ]
})
export class CustomPostModule {}
