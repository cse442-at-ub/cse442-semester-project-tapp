from django.db import models

# Create your models here.
class Event(models.Model):
    startTime = models.CharField("", max_length=100)
    endTime = models.CharField("", max_length=100)
    classNum = models.CharField("CSE 442", max_length=100)

    def __str__(self):
        return self.startTime + " " + self.endTime + " " + " " + self.classNum
