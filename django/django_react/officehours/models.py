from django.db import models

# Create your models here.
class Event(models.Model):
    startTime = models.CharField("", max_length=50)
    endTime = models.CharField("", max_length=50)
    allDay = models.BooleanField()
    classNum = models.CharField("CSE 442", max_length=50)

    def __str__(self):
        return self.startTime + " " + self.endTime + " " + str(self.allDay) + " " + self.classNum
