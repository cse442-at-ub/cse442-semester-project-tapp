from django.urls import path, include
from .api import OHQueueViewSet

urlpatterns = [
        path('api/officeHours', OHQueueViewSet.as_view({'get': 'list','post':'create'}), name='Event list')
]
