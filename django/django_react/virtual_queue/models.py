from django.db import models



class OHQueue(models.Model):
    officeHour = models.ForeignKey('officehours.Event', default = None, on_delete = models.PROTECT,null=True, blank=True)
    teachingAssist = models.ForeignKey('accounts.CustomUser', default = None, on_delete = models.PROTECT,null=True, blank=True)
    queue = models.TextField(null=True)
    classNum = models.CharField("CSE 442", max_length=50)
    title = models.CharField("General", max_length=50)

    def __str__(self):
        return self.officeHour + " " + self.teachingAssist + " " + self.queue + " " + self.classNum
