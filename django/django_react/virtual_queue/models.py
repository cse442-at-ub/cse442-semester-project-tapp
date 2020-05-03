from django.db import models



class OHQueue(models.Model):
    officeHour = models.ForeignKey('officehours.Event', default = None, on_delete = models.PROTECT)
    teachingAssist = models.ForeignKey('accounts.CustomUser', default = None, on_delete = models.PROTECT)
    queue = models.TextField(null=True)
    classNum = models.CharField("CSE 442", max_length=50)

    def __str__(self):
        return self.officeHour + " " + self.teachingAssist + " " + self.queue + " " + self.classNum
    




