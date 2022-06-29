import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TEST';

  displayedColumns: string[] = ['action','id', 'rsInvoiceNo', 'rsDocumentStamp', 'rsDocumentTax', 'rsFST', 'rsLGT', 'rsBillingVAT', 'rsOtherCharges'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService){


  }
  ngOnInit(): void {
    this.getAllList();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'60%',
      height: '68%'
    }).afterClosed().subscribe(val=>{
      if(val == 'SAVE'){
        this.getAllList();
        alert("List Added Succesfully");
      }
    });
  } 
  getAllList(){
     this.api.getadd()

     .subscribe({
       next:(res)=>{
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
         console.table(res);
       },
       error:(err)=>{
        alert("Error adding a List");
       } 
     });
  }

  editItem(row : any){
    this.dialog.open(DialogComponent,{
      width:'60%',
      height: '68%',
      data : row,
    }).afterClosed().subscribe(val=>{
      if(val == 'UPDATE'){
        this.getAllList(); 
        alert("List Succesfully");
      }
    });
  }

  deleteList(id:number){
    this.api.deleteData(id)
    .subscribe({
      next:(res)=>{
        alert("List Deleted Succesfully");
        this.getAllList();
      },
      error:()=>{
        alert("Error while Deleting the List");
      }
    });
  }
}
