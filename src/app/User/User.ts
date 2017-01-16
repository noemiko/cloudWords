
export class User {
    public login : string;
    public mail : string;
    public dateLogin : string;
    public dateRegister : string;
    public lot : string;
    public lat : string;
    public device : string;
    public isActivated : string;
    public browser : string;
    public os : string;
    public password : string;
    public password2 : string;
    public hash : string;

 constructor(login?:string,mail?:string,password?:string,password2?:string) {
     this.login = login;
     this.mail = mail;
     this.password = password;
     this.password2 = password2;

}

} 

