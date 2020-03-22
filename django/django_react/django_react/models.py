from django.db import models
from django.contrib.auth.models import User

class User (models.Model):
        name = models.CharField(max_length=100)
        email = models.EmailField(max_length=254, unique=True)
        course = models.CharField(max_length=100)
        owner = models.ForeignKey(User, related_name="students", on_delete=models.CASCADE, null=True)
        created_at = models.DateTimeField(auto_now_add=True)
