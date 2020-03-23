from django.db import models

class User (models.Model):
        name = models.CharField(max_length=100)
        email = models.EmailField(max_length=254, unique=True)
        course = models.CharField(max_length=100)
        created_at = models.DateTimeField(auto_now_add=True)
