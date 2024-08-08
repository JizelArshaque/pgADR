import { NgModule } from '@angular/core'; 
import { SafePipe } from 'src/class/safe.pipe';

@NgModule({
    declarations: [
        SafePipe
    ],
    exports: [
        SafePipe
    ]
})
export class SharedPipesModule {
}