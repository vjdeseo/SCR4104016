import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postadd(data : any ){
    return this.http.post<any>("http://localhost:3000/rsList/",data);
  }
  getadd(){
    return this.http.get<any>("http://localhost:3000/rsList/");
  }

  putData(data : any,id : number){
    return this.http.put<any>("http://localhost:3000/rsList/"+id, data); 
  }
  
  deleteData(id:number){
    return this.http.delete<any>("http://localhost:3000/rsList/"+id);
  }
}
