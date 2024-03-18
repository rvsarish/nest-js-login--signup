import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LognPageRoutingModule } from './logn-routing.module';
import { LognPage } from './logn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Import IonicModule here
    LognPageRoutingModule
  ],
  declarations: [LognPage]
})
export class LognPageModule {}
