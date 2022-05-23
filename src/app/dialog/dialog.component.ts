import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  addForm !: FormGroup;
  actionBtn : string = "SAVE";
  invoiceSelected = new FormControl('');

  constructor(private formBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData :  any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      rsInvoiceNo : ['',Validators.required],
      rsDocumentStamp : ['',Validators.required],
      rsDocumentTax : ['',Validators.required],
      rsFST : ['',Validators.required],
      rsLGT : ['',Validators.required],
      rsBillingVAT : ['',Validators.required],
      rsOtherCharges : ['',Validators.required]
    });

    if(this.editData){
       this.actionBtn = "UPDATE";
       this.addForm.controls['rsInvoiceNo'].setValue(this.editData.rsInvoiceNo);
       this.addForm.controls['rsDocumentStamp'].setValue(this.editData.rsDocumentStamp);
       this.addForm.controls['rsDocumentTax'].setValue(this.editData.rsDocumentTax);
       this.addForm.controls['rsFST'].setValue(this.editData.rsFST);
       this.addForm.controls['rsLGT'].setValue(this.editData.rsLGT);
       this.addForm.controls['rsBillingVAT'].setValue(this.editData.rsBillingVAT);
       this.addForm.controls['rsOtherCharges'].setValue(this.editData.rsOtherCharges);
    }


  }

  addList(){
    if(!this.editData){
      this.addForm.controls['rsInvoiceNo'].setValue(this.invoiceSelected.value);
      if(this.addForm.valid){
        this.api.postadd(this.addForm.value)
        .subscribe({
          next:(res)=>{
            alert("List Added Successfully");
            this.addForm.reset();
            this.dialogRef.close('SAVE');
          },
          error:()=>{
            alert("Error in Adding List")
          }
        })

    }
    }else{
      this.UpdateData()
    }
  }
  UpdateData(){
    this.api.putData(this.addForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("List Updated Successfully");
        this.addForm.reset();
        this.dialogRef.close('UPDATE');
      },
      error:()=>{
        alert("Error While Updating the List");
      }
    })
  }



}
