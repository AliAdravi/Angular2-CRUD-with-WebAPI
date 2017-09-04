import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  title: string = "Add";
  id: number = 0;
  errorMessage: any;
  submitted: boolean = false;
  _ref:any;
  constructor(private _fb: FormBuilder, 
              private _avRoute: ActivatedRoute,
              private _customerService: CustomerService,
              private _router: Router) { 
    
    if(this._avRoute.snapshot.params["id"]){
      this.id = parseInt( this._avRoute.snapshot.params["id"]);
      console.log(this.id);
        this.title = 'Edit';
    }

    this.customerForm = this._fb.group({
      id: 0,
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.pattern("[1-9][0-9]{9}")]],
      image:''
    })
  }

  ngOnInit() {
    if(this.id > 0){
        this._customerService.getCustomerById(this.id)
          .subscribe(resp => this.customerForm.setValue(resp)
                   , error => this.errorMessage = error);
          
    }
  }

  save(){
    debugger;
    if(!this.customerForm.valid){
      this.submitted = true;
      return;
    }

    this._customerService.saveCustomer(this.customerForm.value)
        .subscribe(custId => {
            //alert('Saved Successfully!')
            this._router.navigate(['customers', {id: custId}]);
         }, error => this.errorMessage = error )

  }

  cancel(){
    this._router.navigate(["customers", {id: this.id}]);
  }

  get name() { return this.customerForm.get('name'); }  
	get address() { return this.customerForm.get('address'); }
	get phone() { return this.customerForm.get('phone'); }

}
