from rest_framework import routers

from .api import UserViewSet

router = routers.DefaultRouter()
router.register('api/users', UserViewSet, 'users')

urlpatterns = router.urls

from django.contrib import admin
from django.urls import path, include,

urlpatterns = [
        path ('', include('leads.urls'))
]
