from django.urls import path, include
from .api import EventViewSet

'''
urlpatterns = [
        path('api/class', EventViewSet.as_view({'get': 'list','post':'create', 'delete': 'destroy'}), name='Event list')
]
'''

from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/class', EventViewSet, basename="class")
urlpatterns = router.urls
