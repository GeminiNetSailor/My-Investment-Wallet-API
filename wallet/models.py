from django.db import models


class AccountGroup(models.Model):
    name = models.CharField(max_length=100)


class Account(models.Model):
    name = models.CharField(max_length=100)


class CurrenciesTypes(models.Model):
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=100)


class Transactions(models.Model):
    pass
