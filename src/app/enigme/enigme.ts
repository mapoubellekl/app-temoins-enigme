export class Enigme{
    id?: number;
    year?: number;
    month?: number;
    found?: boolean;
    authorized?: boolean;
    imgEnigme: string;

    imgGeoCaching: string;
    imgHiddenObject: string;
    
    constructor(){
        this.imgHiddenObject="";
        this.imgGeoCaching="";
        this.imgEnigme="";
    }
}