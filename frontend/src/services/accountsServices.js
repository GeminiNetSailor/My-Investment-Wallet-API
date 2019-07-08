import BaseService from "./baseService";


export default class AccountsServices extends BaseService {
  constructor() {
    super();
    this.url.route = 'accounts/';
  }
}