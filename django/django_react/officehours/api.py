from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from django.http import HttpResponse
from .serializer import EventSerializer
from .models import Event

class EventViewSet(viewsets.ModelViewSet):
        serializer_class = EventSerializer
        permission_classes = (permissions.AllowAny,)

        def get_queryset(self):
          queryset = Event.objects.all()
          myreq=self.request.query_params.get('classNum')
          if myreq:
              return queryset.filter(classNum=myreq)
          else:
              return queryset
