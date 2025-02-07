from rest_framework import serializers
from .models import Component, Vehicle, Service

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    vehicle_id = serializers.IntegerField(write_only=True)
    component_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True
    ) 
    is_new_components = serializers.JSONField()

    vehicle = VehicleSerializer(read_only=True)  
    components = ComponentSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = ['components'] 

    def create(self, validated_data):
        vehicle_id = validated_data.pop('vehicle_id')
        component_ids = validated_data.pop('component_ids', [])
        is_new_components = validated_data.pop('is_new_components', {})

        try:
            vehicle = Vehicle.objects.get(id=vehicle_id)
        except Vehicle.DoesNotExist:
            raise serializers.ValidationError({"vehicle_id": "Invalid vehicle ID."})

        service = Service.objects.create(vehicle=vehicle, **validated_data)

        components = Component.objects.filter(id__in=component_ids)
        service.components.set(components) 
        service.is_new_components = {str(c.id): is_new_components.get(str(c.id), False) for c in components}
        service.save()

        return service