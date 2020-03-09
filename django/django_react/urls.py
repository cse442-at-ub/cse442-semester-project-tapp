from rest_framework import routers
from django.urls import path, include

from .api import UserViewSet

urlpatterns = [
  path('', include('django_react.urls')
]
