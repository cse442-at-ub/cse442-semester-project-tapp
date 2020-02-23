from django.urls import path
from . import views

urlpatterns = [
    path('api/tapp/', views.ListUsersView.as_view(), name="users-list"),
]
