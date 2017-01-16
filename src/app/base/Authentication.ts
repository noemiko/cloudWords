import { AuthenticationService } from './authentication.service';

export class Authentication {

    constructor(protected _defaultService : AuthenticationService) {
    }

    protected isLogged(){
        this._defaultService.isLoggedIn().subscribe(

            response => this.handleResponse(response),
            error => this.handleResponse(error)
        );
    }

    handleResponse(response){
        if(response.error ==false){

            if(typeof response.message.login !== undefined){
                this._defaultService.userLoggedIn.next(true);
                this._defaultService.userName = response.message.login;

                this.setLoggedInformations();

            }else{
                this.setUnLoggedInformations();
            }
        }

        if(response.error ===true){
            this.setUnLoggedInformations();
        }
    }

    protected setLoggedInformations(){

    }

    protected setUnLoggedInformations(){

    }

}

