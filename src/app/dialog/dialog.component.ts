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

  endorseAddForm !: FormGroup;
  actionBtn : string = "SAVE";
  invoiceSelected = new FormControl('');

  constructor(private formBuilder : FormBuilder,
    private api : ApiService,
    @Inject(MAT_DIALOG_DATA) public editData :  any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.endorseAddForm = this.formBuilder.group({
      endorseTblDataInvoiceNo : ['',Validators.required],
      endorseTblDataDocumentStamp : ['',Validators.required],
      endorseTblDataDocumentTax : ['',Validators.required],
      endorseTblDataFST : ['',Validators.required],
      endorseTblDataLGT : ['',Validators.required],
      endorseTblDataBillingVAT : ['',Validators.required],
      endorseTblDataOtherCharges : ['',Validators.required]
    });

    if(this.editData){
       this.actionBtn = "UPDATE";
       this.endorseAddForm.controls['endorseTblDataInvoiceNo'].setValue(this.editData.endorseTblDataInvoiceNo);
       this.endorseAddForm.controls['endorseTblDataDocumentStamp'].setValue(this.editData.endorseTblDataDocumentStamp);
       this.endorseAddForm.controls['endorseTblDataDocumentTax'].setValue(this.editData.endorseTblDataDocumentTax);
       this.endorseAddForm.controls['endorseTblDataFST'].setValue(this.editData.endorseTblDataFST);
       this.endorseAddForm.controls['endorseTblDataLGT'].setValue(this.editData.endorseTblDataLGT);
       this.endorseAddForm.controls['endorseTblDataBillingVAT'].setValue(this.editData.endorseTblDataBillingVAT);
       this.endorseAddForm.controls['endorseTblDataOtherCharges'].setValue(this.editData.endorseTblDataOtherCharges);
    }


  }

  EndorseDataaddList(){
    if(!this.editData){
      this.endorseAddForm.controls['endorseTblDataInvoiceNo'].setValue(this.invoiceSelected.value);
      if(this.endorseAddForm.valid){
        this.api.postadd(this.endorseAddForm.value)
        .subscribe({
          next:(res)=>{
            alert("List Added Successfully");
            this.endorseAddForm.reset();
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
    this.api.putData(this.endorseAddForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("List Updated Successfully");
        this.endorseAddForm.reset();
        this.dialogRef.close('UPDATE');
      },
      error:()=>{
        alert("Error While Updating the List");
      }
    })
  }



}
