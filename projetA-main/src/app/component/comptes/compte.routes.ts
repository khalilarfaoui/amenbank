import { Routes } from "@angular/router";
import { ComptListComponent } from "./compt-list/compt-list.component";
import { CompteDetailComponent } from "./compte-detail/compte-detail.component";

export const COMPTE_ROUETS: Routes = [
    {
        path: '', component: ComptListComponent
    },
    {
        path: 'detail', component: CompteDetailComponent
    }
]