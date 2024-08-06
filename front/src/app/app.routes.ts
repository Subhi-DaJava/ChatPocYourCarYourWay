import { Routes } from '@angular/router';
import {ChatComponent} from "./page/chat/chat.component";
import {userGuard} from "./guard/user.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'chat/user', pathMatch: 'full' },
  { path: 'chat/:user', component: ChatComponent, canActivate: [userGuard] }
];
