from django.db import models

class Users(models.Model):
        name = models.CharField(max_length=100)
        email = models.EmailField()
        instructor = models.BooleanField()
        course = models.CharField(max_length=100)

