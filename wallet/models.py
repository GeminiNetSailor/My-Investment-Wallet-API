from django.db import models


class CurrencyType(models.Model):
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=10)

    def __str__(self):
        return self.name

    # class Meta:
    #     verbose_name_plural = "currenciestypes"


class AccountsGroup(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Account(models.Model):
    name = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=20, decimal_places=10)
    group = models.ForeignKey(AccountsGroup, on_delete=models.CASCADE, blank=True, null=True)
    currency = models.ForeignKey(CurrencyType, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    from_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='from_account')
    to_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='to_account')
    sub_total = models.DecimalField(max_digits=20, decimal_places=10)
    total = models.DecimalField(max_digits=20, decimal_places=10)
    exchange_rate = models.DecimalField(max_digits=20, decimal_places=10)
    commission = models.DecimalField(max_digits=20, decimal_places=10)
    commission_rate = models.DecimalField(max_digits=4, decimal_places=4)
    received_currency = models.ForeignKey(CurrencyType, on_delete=models.CASCADE)
