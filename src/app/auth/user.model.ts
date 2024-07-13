export class User{
    constructor(
        public email :string,
        public id:string,
        private _token : string,
        private _tokenExpirationDate : Date
    ){}

    // get like this is fun and property  so can use like User.taken()
    get token(){
        // if this not exist || current Date(new date) > time of token
        if (!this._tokenExpirationDate || new Date > this._tokenExpirationDate) {
            return null
        }
        return this._token
    }
}
