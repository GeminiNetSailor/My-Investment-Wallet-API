from django.contrib import admin

from wallet.models import CurrencyType, AccountsGroup, Account, Transaction

admin.site.register(CurrencyType)
admin.site.register(AccountsGroup)
admin.site.register(Account)
admin.site.register(Transaction)