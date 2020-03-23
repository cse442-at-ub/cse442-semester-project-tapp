from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from django.http import HttpResponse
from .serializer import EventSerializer
from .models import Event

class EventViewSet(viewsets.ModelViewSet):
        serializer_class = EventSerializer
        queryset = Event.objects.all()
        permission_classes=[
                permissions.AllowAny
        ]