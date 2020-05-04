from django.urls import path, include
from .api import OHQueueViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/officeHours', OHQueueViewSet, basename="officeHours")
urlpatterns = router.urls
