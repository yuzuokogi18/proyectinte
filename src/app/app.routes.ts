import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Landing } from './landing/landing';
import { Loginalumno } from './loginalumno/loginalumno';
import { Registroalumno } from './registroalumno/registroalumno';
import { Administradorhome } from './administradorhome/administradorhome';

export const routes: Routes = [{ path: '', component:Home },
    { path: 'landing', component: Landing },
{ path: 'loginalumno', component: Loginalumno },
{ path: 'registroalumno', component: Registroalumno },
{ path: 'administradorhome', component: Administradorhome }];
