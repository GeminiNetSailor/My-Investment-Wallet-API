import BaseService from "./baseService";


export default class AccountsGroupsServices extends BaseService {
  constructor() {
    super();
    this.url.route = 'accounts-groups/';
  }
}