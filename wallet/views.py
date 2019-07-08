from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework.decorators import permission_classes, authentication_classes, action
from rest_framework.response import Response

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

    @action(detail=True)
    def accounts(self, request, pk=None):
        accountGroup = models.AccountsGroup.objects.get(pk=pk)
        accounts = accountGroup.account_set.all()
        serializer = serializers.AccountSerializer(accounts, many=True)
        return JsonResponse(serializer.data, safe=False)

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
