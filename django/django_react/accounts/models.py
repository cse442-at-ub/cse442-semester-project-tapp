from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
# Create your models here.

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(('email address'), unique = True)
    instructor = models.BooleanField(('Instructor'))

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    REGISTERED_CLASSES = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
