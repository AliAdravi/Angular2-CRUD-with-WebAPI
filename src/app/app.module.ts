import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerComponent } from './components/customer/customer.component'
import { TestComponent } from './components/test/test.component';

//Services
import { CustomerService } from './services/customer.service';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SearchPipe } from './pipes/search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    NavComponent,
    OrderByPipe,
    SearchPipe,
    CustomerComponent,
    HomeComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "home", pathMatch: 'full' },
      { path: "home", component: HomeComponent },
      { path: "customers", component: CustomerListComponent },
      { path: "customers/add", component: CustomerComponent },
      { path: "customers/edit/:id", component: CustomerComponent },
      { path: '**', component: HomeComponent }
    ])
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
