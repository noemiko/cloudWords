export class CloudService {
private TextForCloud = '';

public set textForCloud(input:string){
    this.TextForCloud = input;
}

public get textForCloud():string{
  return this.TextForCloud;
}

  constructor() { }

}
