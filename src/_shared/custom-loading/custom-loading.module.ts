import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CustomLoadingComponent } from './custom-loading.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CustomLoadingComponent
  ],
  exports: [
    CustomLoadingComponent
  ]
})
export class CustomLoadingModule {}
