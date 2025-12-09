import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Landing } from './landing/landing';
import { Loginalumno } from './loginalumno/loginalumno';
import { Registroalumno } from './registroalumno/registroalumno';
import { Administradorhome } from './administradorhome/administradorhome';
import { Createart } from './createart/createart';
import { Homealumno } from './homealumno/homealumno';
import { Misprestamosalumno } from './misprestamosalumno/misprestamosalumno';
import { Solicitudes } from './solicitudes/solicitudes';
import { Adminheader } from './adminheader/adminheader';
import { Usuarios } from './usuarios/usuarios';
import { Headeralumno } from './headeralumno/headeralumno';
import { Notificaciones } from './notificaciones/notificaciones';

export const routes: Routes = [{ path: '', component:Home },
    { path: 'landing', component: Landing },
{ path: 'loginalumno', component: Loginalumno },
{ path: 'registroalumno', component: Registroalumno },
{ path: 'administradorhome', component: Administradorhome },
{ path: 'createart', component: Createart },
{ path: 'homealumno', component: Homealumno },
{ path: 'misprestamosalumno', component: Misprestamosalumno },
{ path: 'solicitudes', component:Solicitudes},
{ path: 'adminheader', component:Adminheader},
{ path: 'usuarios', component:Usuarios},
{ path: 'headeralumno', component:Headeralumno},
{ path: 'notificacionesalumno', component:Notificaciones},

];
