import { BaseService } from './base.service';

export class Base {

    protected isUserLogged:boolean = false;
    protected userName:string;

    constructor(protected _defaultService : BaseService) {

    }

    protected isLogged(){
        this._defaultService.isLoggedIn().subscribe(

            response => this.handleResponse(response),
            error => this.handleResponse(error)
        );
    }

    handleResponse(response){
        if(response.error ==false){
            this.isUserLogged = true;
            this.userName = response.message.login;
        }

        if(response.error ===true){

        }
    }

}

