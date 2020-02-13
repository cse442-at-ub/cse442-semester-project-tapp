from django.shortcuts import render
from rest_framework import generics
from .models import Users
from .serializers import UsersSerializer

class ListUsersView(generics.ListAPIView):
        queryset = Users.objects.all()
        serializer_class = UsersSerializer
