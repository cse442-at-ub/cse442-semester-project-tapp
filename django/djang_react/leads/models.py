from django.db import models

# Create your models here.
class Lead(models.Model):
    name = models.CharField(max_length = 100)
    email = models.EmailField()
    instructor = models.BooleanField(max_length = 300)
    created_at = models.DateTimeField(auto_now_add = True)

    def __str__(self):
            return "Name: {}\n email: {}\nInstructor?: {}\nCreated at: {}".format(self.name, self.email, self.instructor, created_at)
