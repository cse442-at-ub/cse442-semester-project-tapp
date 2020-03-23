from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(('email address'), unique = True)
    instructor = models.BooleanField(('Instructor'))
    name = models.TextField(('Name'), default="Matthew Hertz")
    course = models.TextField(('Course'), default="CSE442")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    REGISTERED_CLASSES = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
