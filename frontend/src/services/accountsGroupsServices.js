import BaseService from "./baseService";
import AccountsServices from "./accountsServices";


export default class AccountsGroupsServices extends BaseService {
  constructor() {
    super();
    this.url.route = 'accounts-groups/';
    this.accountsServices = new AccountsServices();
    this.accountsServices.id = 2;
    this.accountsServices.url = {...this.url, subRoute: this.accountsServices.url.route};
  }
}