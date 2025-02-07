from rest_framework import generics, status
from .models import Component, Vehicle, Service
from .serializers import ComponentSerializer, VehicleSerializer, ServiceSerializer
from rest_framework.response import Response
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from django.db.models.functions import TruncMonth, TruncYear, TruncDay
from rest_framework.decorators import api_view
from django.http import JsonResponse

class ComponentList(generics.ListCreateAPIView): 
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer

class VehicleList(generics.ListCreateAPIView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class ServiceList(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class ServiceDetail(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

@api_view(['GET'])
def get_services_by_vehicle(request, vehicle_identification):
    try:
        vehicle = get_object_or_404(Vehicle, identification=vehicle_identification)
        services = Service.objects.filter(vehicle=vehicle) 

        if not services.exists(): 
            return Response({"error": "No services found for this vehicle"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 

    except Vehicle.DoesNotExist: 
        return Response({"error": "Vehicle not found"}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:  
        print(f"An unexpected error occurred: {e}")  
        return Response({"error": "An unexpected error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def calculate_total_cost(queryset):
    total_cost_data = []
    for item in queryset:
        total_cost = item.fixed_labor_charge
        for component in item.components.all():
            is_new = item.is_new_components.get(str(component.id), False)
            total_cost += component.purchase_price if is_new else component.repair_price
        total_cost_data.append({'created_at': item.created_at, 'total_cost': total_cost})
    return total_cost_data

@api_view(['GET'])
def daily_revenue(request):
    daily_costs = calculate_total_cost(Service.objects.all())
    result = {}
    for item in daily_costs:
        date = item['created_at'].strftime('%Y-%m-%d') 
        if date in result:
            result[date] += item['total_cost']
        else:
            result[date] = item['total_cost']

    return Response(result, status=status.HTTP_200_OK)

@api_view(['GET'])
def monthly_revenue(request):
    monthly_costs = calculate_total_cost(Service.objects.all())
    result = {}
    for item in monthly_costs:
        month = item['created_at'].strftime('%Y-%m') 
        if month in result:
            result[month] += item['total_cost']
        else:
            result[month] = item['total_cost']
    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def yearly_revenue(request):
    yearly_costs = calculate_total_cost(Service.objects.all())
    result = {}
    for item in yearly_costs:
        year = item['created_at'].strftime('%Y')
        if year in result:
            result[year] += item['total_cost']
        else:
            result[year] = item['total_cost']
    return Response(result, status=status.HTTP_200_OK)