import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


//let apiUrl = "http://localhost/PHP-Slim-Restful/api/";
let apiUrl = "https://yogsolanki87.000webhostapp.com/api/";

@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Inside authServiceProvider');
  }

//Post data
  postData(credentials, type){
    return new Promise((resolve, reject)=>{
      let headers = new HttpHeaders();
      this.http.post(apiUrl+type, JSON.stringify(credentials), {headers: headers}).
      subscribe(res =>{
        console.log('Post Operation Suceess');
        resolve(res);
      }, (err) =>{
        console.log('Post Operation Falied');
        reject(err);
    });
  });
}

//Get Data
getData(type){
  return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders();
    this.http.get(apiUrl+type, {headers: headers}).
    subscribe(res =>{
      console.log('Get Operation Suceess');
      resolve(res);
    }, (err) =>{
      console.log('Get Operation Falied');
      reject(err);
  });
});
}

}