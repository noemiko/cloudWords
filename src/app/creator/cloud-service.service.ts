export class CloudService {
private TextForCloud = '';

public set textForCloud(input:string){
    this.TextForCloud = input;
    console.log(this.TextForCloud)
}
  constructor() { }

}
