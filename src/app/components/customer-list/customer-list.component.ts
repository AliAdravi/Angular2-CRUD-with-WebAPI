import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  customers: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;

  serarchText: string ='';
  
  constructor( private _customerService : CustomerService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this._activatedRoute.snapshot.params["id"])
      this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
    this.getCustomers();
  }

  getCustomers(){
    this._customerService.getCustomers().subscribe(
        data => this.customers = data,
        error => { debugger;
          this.errorMessage = error
        }
    )
  }

  add(){
    this._router.navigate(['customers/add']);
  }
  edit(id){
    this._router.navigate(['customers/edit/' + id])
  }
  delete(id){
    var ans = confirm("Do you want to delete customer with Id: " + id);
    if(ans){
      this._customerService.deleteCustomer(id)
          .subscribe(  data=> {
            var index = this.customers.findIndex(x=>x.id == id);
            this.customers.splice(index, 1);
          }, error=> this.errorMessage = error )
    }
  }
}
