import { Component, VERSION, OnInit, Input, OnChanges } from '@angular/core';
import { EnigmePerMonth } from '../beans/enigmePerMonth';
import { FormBuilder } from '@angular/forms';
import { Enigme } from './enigme';
import { EnigmeService } from './enigme.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-enigme',
  templateUrl: './enigme.component.html',
  styleUrls: ['./enigme.component.scss']
})
export class EnigmeComponent implements OnInit, OnChanges {

  @Input() public idEnigme?: number;
  checkoutForm = this.formBuilder.group({
      response: ''
    });

  loading = false;
  enigme? : Enigme;

  constructor(private formBuilder: FormBuilder, private enigmeService: EnigmeService, public _DomSanitizationService: DomSanitizer){

  }

  ngOnInit() {
    this.refresh();
  }

   ngOnChanges() {
    this.refresh();
  }   

  async refresh() {
    this.loading = true;
    console.log("refresh enigme " + this.idEnigme);
    if(this.idEnigme){
      var tmpEnigme = await this.enigmeService.getEnigme(this.idEnigme);
      this.transformImagesAndUpdate(tmpEnigme);
    }
    this.loading = false;
  }

  private transformImagesAndUpdate(tmpEnigme: any) {
    if (tmpEnigme) {
      tmpEnigme.imgEnigme = this.getImgSrcFrom(tmpEnigme.imgEnigme);
      tmpEnigme.imgGeoCaching = this.getImgSrcFrom(tmpEnigme.imgGeoCaching);
      tmpEnigme.imgHiddenObject = this.getImgSrcFrom(tmpEnigme.imgHiddenObject);
      this.enigme = tmpEnigme;
    }
  }

  getImgSrcFrom(src:any){
    if(src){
      let typedArray = new Uint8Array(src.data);
      const dataStr = typedArray.reduce((data, byte)=> {
        return data + String.fromCharCode(byte);
        }, '');
  
      let base64String = btoa(dataStr);
      return this._DomSanitizationService.bypassSecurityTrustUrl('data:image/png;base64, ' + base64String);
    }
    return this._DomSanitizationService.bypassSecurityTrustUrl("");
  }
  
  async onSubmitResponse(){
    console.info('Check enigme with reposnse : ', this.checkoutForm.value);
    if(this.enigme && this.checkoutForm.get('response')){
      this.loading = true;
      if(this.idEnigme){
        var tmpEnigme = await this.enigmeService.checkEnigme(this.idEnigme, this.checkoutForm.get('response')?.value);
        this.checkoutForm.get('response')?.setErrors(tmpEnigme.found ? null : {'invalid':true, 'message':'Mot de passe invalide'});
        this.transformImagesAndUpdate(tmpEnigme);
      }
      this.loading = false;
    }
  }

}
