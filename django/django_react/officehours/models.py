from django.db import models

# Create your models here.
class Event(models.Model):
    startTime = models.CharField("", max_length=100)
    endTime = models.CharField("", max_length=100)
    classNum = models.CharField("CSE 442", max_length=100)
    instructor = models.CharField("Andyboi", max_length=100000000, default= "Andyboi")
    owner = models.EmailField("a@a.com", default= "a@a.com")

    def __str__(self):
        return self.startTime + " " + self.endTime + " " + " " + self.classNum
