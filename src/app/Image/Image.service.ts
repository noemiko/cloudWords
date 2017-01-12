import {Injectable}               from '@angular/core';
import {Http, Response}           from '@angular/http';
import {Headers, RequestOptions}  from '@angular/http';
import {Observable}               from 'rxjs/Observable';
import {Image}                     from './Image';
 
@Injectable()
export class ImageService {
  constructor (private _http: Http) {}
 
 private _saveUrl = 'http://localhost/cloudWords/backend/saveImage.php';
 private _shareUrl = 'http://localhost/cloudWords/backend/shareImage.php';
 private _historyUrl = 'http://localhost/cloudWords/backend/history.php';
 private _removeUrl = 'http://localhost/cloudWords/backend/removeImage.php';


    save(image:Image): Observable<string>{
    let body = `name=${image.name}&image=${image.url}`;
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
 
    return this._http.post(this._saveUrl, body, options)
                    .map(res =>  <string> res.json())
                    .catch(this.handleError)
  }

  share(imageFileName:string): Observable<string>{
    let body = `hash=${imageFileName}`;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
 
    return this._http.post(this._shareUrl, body, options)
                    .map(res =>  <string> res.json())
                    .catch(this.handleError)
  }

    getGallery(): Observable<string>{
    let body = ``;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
 
    return this._http.post(this._historyUrl,body, options)
                    .map(res =>  <string> res.json())
                    .catch(this.handleError)
  }

    remove(imageFileName:string): Observable<string>{
        let body = `hash=${imageFileName}`;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._removeUrl, body, options)
            .map(res =>  <string> res.json())
            .catch(this.handleError)
    }





  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error('Error in retrieving news: ' + error);
    return Observable.throw(error || 'Server error');
  }
}