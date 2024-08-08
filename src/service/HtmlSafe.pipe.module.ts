import { NgModule } from '@angular/core'; 
import { HtmlSafePipe } from 'src/class/htmlsafe.pipe';

@NgModule({
    declarations: [
        HtmlSafePipe
    ],
    exports: [ 
        HtmlSafePipe
    ]
})
export class HtmlSharedPipesModule {
}