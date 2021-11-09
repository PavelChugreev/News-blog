import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../shared/services/Auth.guard";
import { AdminComponent } from "./admin.component";
import { CreateComponent } from "./create/create.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditComponent } from "./edit/edit.component";
import { LoginComponent } from "./login/login.component";

const routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'create', component: CreateComponent, canActivate: [AuthGuard]},
      {path: 'posts/:id/edit', component: EditComponent, canActivate: [AuthGuard]}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AdminRouterModule {}