from django.urls import path, include
from .api import OHQueueViewSet, QueueUpdateView, OHQueueViewPost
from rest_framework import routers
from django.conf.urls import url

urlpatterns = [
  path('api/officeHours/Get', OHQueueViewSet.as_view()),
  path('api/officeHours/Post', OHQueueViewPost.as_view()),
  path('api/officeHours/Update/<int:pk>/', QueueUpdateView.as_view())
]
