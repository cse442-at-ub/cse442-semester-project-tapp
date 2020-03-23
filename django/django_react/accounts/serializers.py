from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser

# User Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    fields = ('id','email', 'course')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    fields = ('id','email', 'password', 'instructor', 'course', 'name')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = CustomUser.objects.create_user(validated_data['email'], validated_data['password'], validated_data['instructor'], validated_data['course'], validated_data['name'])

    return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
  email = serializers.EmailField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Invalid password.")
