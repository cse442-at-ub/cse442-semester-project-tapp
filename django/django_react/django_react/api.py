from django_react.models import User
from rest_framework import viewsets, permissions
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
        serializer_class = UserSerializer
        queryset = User.objects.all()
        permission_classes=[
                permissions.AllowAny
        ]

        '''
        def get_queryset(self):
                return self.request.user.users.all()

        def perform_create(self, serializer):
                serializer.save()
        '''

