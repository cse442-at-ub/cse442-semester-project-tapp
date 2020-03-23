from django.urls import path, include
from .api import EventViewSet

urlpatterns = [
        path('api/class', EventViewSet.as_view({'get': 'list','post':'create'}), name='Event list')
]
