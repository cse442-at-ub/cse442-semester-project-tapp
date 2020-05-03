from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from django.http import HttpResponse
from .serializer import OHQueueSerializer
from .models import OHQueue

class OHQueueViewSet(viewsets.ModelViewSet):
        serializer_class = OHQueueSerializer
        permission_classes = (permissions.AllowAny,)

        def get_queryset(self):
          queryset = OHQueue.objects.all()
          myreq=self.request.query_params.get('classNum')
          return queryset.filter(classNum=myreq)
