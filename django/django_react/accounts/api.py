from rest_framework import generics, permissions
from rest_framework.response import Response
from django.http import JsonResponse
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from .models import CustomUser

class RegAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    _, token = AuthToken.objects.create(user)
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": token
    })

class LogAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    _, token = AuthToken.objects.create(user)
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": token
    })

class UserAPI(generics.RetrieveUpdateAPIView):
  permission_classes = [ permissions.IsAuthenticated ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user

  def patch(self, request):
    temp = self.request.user
    serializer = UserSerializer(temp, data=request.data, partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return JsonResponse(code=400, data="OOK OOK OOK OOK OOK OOK OOK OOK")

class InstructAPI (generics.ListAPIView):
  permission_classes = [ permissions.AllowAny ]
  serializer_class = UserSerializer

  def get_queryset(self):
    queryset = CustomUser.objects.all()
    myreq=self.request.query_params.get('classNum')
    if myreq:
        return queryset.filter(course=myreq,instructor=True)
    else:
        return []
