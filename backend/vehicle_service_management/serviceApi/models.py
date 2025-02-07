from django.db import models
from django.utils import timezone

class Component(models.Model):
    name = models.CharField(max_length=255, unique=True)
    repair_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.name

class Vehicle(models.Model):
    identification = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.identification

class Service(models.Model): 
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='services')
    description = models.TextField() 
    components = models.ManyToManyField(Component) 
    is_new_components = models.JSONField(default=dict)  
    fixed_labor_charge = models.DecimalField(max_digits=10, decimal_places=2, default=1500) 
    created_at = models.DateTimeField(auto_now_add=True)

    def calculate_cost(self):
        cost = self.fixed_labor_charge 
        for component in self.components.all():
            is_new = self.is_new_components.get(str(component.id), False)
            cost += component.purchase_price if is_new else component.repair_price
        return cost

    def __str__(self):
        return f"Service for {self.vehicle.identification}"