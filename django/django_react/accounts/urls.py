from django.urls import path, include
from .api import RegAPI, LogAPI, UserAPI, InstructAPI
from knox import views as knox_views

urlpatterns = [
  path('api/auth', include('knox.urls')),
  path('api/auth/register', RegAPI.as_view()),
  path('api/auth/login', LogAPI.as_view()),
  path('api/auth/user', UserAPI.as_view()),
  path('api/instructors', InstructAPI.as_view()),
  path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]
