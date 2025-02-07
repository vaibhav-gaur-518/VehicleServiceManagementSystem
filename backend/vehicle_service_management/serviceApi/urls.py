from django.urls import path
from . import views

urlpatterns = [
   path('components/', views.ComponentList.as_view(), name='component-list'),

    path('vehicles/', views.VehicleList.as_view(), name='vehicle-list'),

    path('services/', views.ServiceList.as_view(), name='service-list'),
    path('services/<int:pk>/', views.ServiceDetail.as_view(), name='service-detail'), 

    path('revenue/monthly/', views.monthly_revenue, name='monthly-revenue'),
    path('revenue/yearly/', views.yearly_revenue, name='yearly-revenue'),
    path('revenue/daily/', views.daily_revenue, name='daily-revenue'),

    path('services/vehicle/<str:vehicle_identification>/', views.get_services_by_vehicle, name='get_services_by_vehicle'), # Corrected name

]