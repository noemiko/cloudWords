
export class User {
    private login : string;
    private mail : string;
    private dateLogin : string;
    private dateRegister : string;
    private lot : string;
    private lat : string;
    private device : string;
    private isActivated : string;
    private browser : string;
    private os : string;
    private password : string;
    private password2 : string;

 constructor(login:string,mail:string,password:string,password2:string) { 
     this.login = login;
     this.mail = mail;
     this.password = password;
     this.password2 = password2;
     
}

public get Login():string{
    return this.login;
}

public get Mail():string{
    return this.mail;
}

public get Password():string{
    return this.password;
}

public get Password2():string{
    return this.password2;
}




} 

