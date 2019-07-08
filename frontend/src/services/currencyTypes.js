import BaseService from "./baseService";


export default class CurrenciesTypes extends BaseService {
  constructor() {
    super();
    this.url.route = 'currency-types/';
  }
}