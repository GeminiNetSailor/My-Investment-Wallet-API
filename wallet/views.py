from rest_framework import viewsets
from rest_framework.decorators import permission_classes, authentication_classes

from . import models, serializers

@authentication_classes([])
@permission_classes([])
class CurrencyTypeViewSet(viewsets.ModelViewSet):
    queryset = models.CurrencyType.objects.all()
    serializer_class = serializers.CurrencyTypeSerializer

@authentication_classes([])
@permission_classes([])
class AccountsGroupViewSet(viewsets.ModelViewSet):
    queryset = models.AccountsGroup.objects.all()
    serializer_class = serializers.AccountsGroupSerializer


@authentication_classes([])
@permission_classes([])
class AccountViewSet(viewsets.ModelViewSet):
    queryset = models.Account.objects.all()
    serializer_class = serializers.AccountSerializer


@authentication_classes([])
@permission_classes([])
class AccountViewSet(viewsets.ModelViewSet):
    queryset = models.Account.objects.all()
    serializer_class = serializers.AccountSerializer


@authentication_classes([])
@permission_classes([])
class TransactionViewSet(viewsets.ModelViewSet):
    queryset = models.Transaction.objects.all()
    serializer_class = serializers.TransactionSerializer
