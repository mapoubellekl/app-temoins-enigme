import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enigme} from './enigme';


// const baseUrl = 'http://localhost:4201';
const baseUrl = 'https://shielded-headland-84561.herokuapp.com';


@Injectable({
  providedIn: 'root'
})
export class EnigmeService {

  constructor(private http: HttpClient) { 
  }

  private async request(method: string, url: string, data?: any) {

    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {
      }
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  getEnigme(id:number){
    let res = this.request('get', `${baseUrl}/enigme/${id}`);
    console.log('Resultat get ' + JSON.stringify(res));
    return res;
  }
  checkEnigme(id:number, response:string){
    return this.request('post', `${baseUrl}/check-enigme/${id}`, {response});
  }

}
