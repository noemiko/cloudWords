import {Injectable}               from '@angular/core';
import {Http}                     from '@angular/http';
import {Observable}               from 'rxjs/Observable';
import {Image}                     from './Image';
import {DefaultService}           from './../default/default.Service';

@Injectable()
export class ImageService extends DefaultService{
    constructor (protected _http: Http) {
        super(_http);
    }

    private _saveUrl = this.backendPath+'saveImage.php';
    private _shareUrl = this.backendPath+'shareImage.php';
    private _historyUrl = this.backendPath+'history.php';
    private _removeUrl = this.backendPath+'removeImage.php';


    public save(image:Image): Observable<string>{
        let body = `name=${image.name}&image=${image.url}`;

        return this._http.post(this._saveUrl, body, this.options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }

    public share(imageFileName:string): Observable<string>{
        let body = `hash=${imageFileName}`;

        return this._http.post(this._shareUrl, body, this.options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }

    public getGallery(): Observable<string>{
        let body = ``;

        return this._http.post(this._historyUrl,body, this.options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }

    public remove(imageFileName:string): Observable<string>{
        let body = `hash=${imageFileName}`;

        return this._http.post(this._removeUrl, body, this.options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }
}