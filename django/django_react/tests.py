from django.test import TestCase
from officehours.models import Event
from django.utils import timezone

class EventTest(TestCase):
  def create_event(self, startDate="date", endDate="endDate", allDay=False, classNum="CSE442"):
          return Event.objects.create(startTime=startDate, endTime=endDate, allDay=allDay, classNum=classNum)

  def test_event_creation(self):
    e = self.create_event()
    self.assertTrue(isinstance(e, Event))
    self.assertEqual(e.__str__(), e.startTime + " " + e.endTime + " " + str(e.allDay) + " " + e.classNum)
