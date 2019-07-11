import BaseService from "./baseService";
import AccountsServices from "./accountsServices";


export default class AccountsGroupsServices extends BaseService {
  constructor() {
    super();
    this.url.route = 'accounts-groups/';
  }
}