export class Image {
     id : string;
     url : string;
     name : string;
     date_create : string;

     constructor(id?:string, url?:string, name?:string, dateCreate?:string){
         this.id = id;
         this.url = url;
         this.name = name;
         this.date_create = dateCreate;
     }

     public getListHtml(){
         return `<li class="col-sm-3">
         <a class="thumbnail" id=image_`+this.id+`><img src="`+this.url+`"></a>
         <div>Date create `+this.date_create+`</div>
         </li>`
     }
}