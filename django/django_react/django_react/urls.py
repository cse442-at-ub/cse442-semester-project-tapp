from rest_framework import routers
from django.urls import path, include
from .api import UserViewSet

router = routers.DefaultRouter()
router.register('api/users', UserViewSet, 'users')

urlpatterns = router.urls

from django.contrib import admin
from django.urls import path, include

urlpatterns.append(
    path('', include('accounts.urls'))
)

urlpatterns.append(
    path('',include('officehours.urls'))
)

urlpatterns.append(
    path('',include('virtual_queue.urls')))
