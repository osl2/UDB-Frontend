import {DefaultApi} from "@/api/DefaultApi";

export default abstract class ApiControllerAbstract {
  private _api: DefaultApi;

  constructor(api: DefaultApi) {
    this._api = api;
  }

  get api(): DefaultApi {
    return this._api;
  }

  set api(value: DefaultApi) {
    this._api = value;
  }
}
