import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import {HttpModule} from "@angular/http";
import {FlashMessagesModule} from "angular2-flash-messages/module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Data, RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./guards/auth.guard";
import {AuthService} from "./services/auth.service";
import {RecipesComponent} from "./components/recipes/recipes.component";
import {RecipeEditComponent} from "./components/recipes/recipe-edit/recipe-edit.component";
import {RecipeItemComponent} from "./components/recipes/recipe-list/recipe-item/recipe-item.component";
import {RecipeListComponent} from "./components/recipes/recipe-list/recipe-list.component";
import {RecipeService} from "./services/recipe.service";
import {RecipeStartComponent} from "./components/recipes/recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./components/recipes/recipe-detail/recipe-detail.component";
import {DropdownDirective} from "./shared/dropdown.directive";
import {DataStorageService} from "./services/data-storage.service";
import { FilterPipe } from './pipes/filter.pipe';
import {NgxPaginationModule} from "ngx-pagination";

const appRoutes: Routes = [
  // {path:'', component: HomeComponent},
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path:'register', component: RegisterComponent},
  { path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: RecipeStartComponent, canActivate: [AuthGuard] },
    {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
    {path: ':id', component: RecipeDetailComponent },
    {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
  ]},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent,
    RecipesComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    DropdownDirective,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule,
    HttpModule,
    NgxPaginationModule
  ],
  providers: [AuthService, AuthGuard, RecipeService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
