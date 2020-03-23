from django.db import models

# Create your models here.
class Event:
    startTime = models.CharField("", max_length=50)
    endTime = models.CharField("", max_length=50)
    allDay = models.BooleanField()
    classNum = models.CharField("CSE 442", max_length=50)
    objects = models.Manager()
    
    def __str__(self):
        return self.startTime + " " + self.endTime + " " + self.allDay + " " + self.classNum
    