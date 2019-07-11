from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'currency-types', views.CurrencyTypeViewSet)
router.register(r'accounts-groups', views.AccountsGroupViewSet)
router.register(r'accounts', views.AccountViewSet)
router.register(r'transactions', views.TransactionViewSet)

urlpatterns = [
    path('/accounts-groups/<id>/accounts/', views.BookingsForHouseListView),
    path('', include(router.urls))
]
