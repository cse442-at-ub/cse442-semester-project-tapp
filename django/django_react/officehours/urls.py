from django.urls import path, include
from .api import EventViewSet

urlpatterns = [
    path('api/class', EventViewSet)
]