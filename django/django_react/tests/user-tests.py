from django.test import TestCase
from django_react.models import Whatever
from django.utils import timezone
from django.core.urlresolvers import reverse

class UserTest(TestCase):
        def create_user(self, name="test", email="helo@gmail.com", course="cse191"):
                return User.objects.create(name=name, email=email, course=course, created_at=timezone.now())

        def setUp(self):
                return User.objects.create(name="andy", email="anrao3@buffalo.edu", course="CSE191", created_at=timezone.now())
                return User.objects.create(name="huss", email="huss@buffalo.edu", course="CSE396", created_at=timezone.now())

        def test_user_create(self):
                u = self.create_user()
                u1 = User.objects.get(name="andy")
                u2 = User.objects.get(name="huss")
                self.assertTrue(isinstance(w, User))
                self.assertTrue(isinstance(u1, User))
                self.assertTrue(isinstance(u2, User))
                self.assertEqual(u1.name, "andy")
                self.assertEqual(u2.name, "huss")
                self.assertEqual(u1.name, "anrao3@buffalo.edu")
                self.assertEqual(u2.name, "anrao3@buffalo.edu")
                self.assertEqual(u1.name, "CSE191")
                self.assertEqual(u2.name, "CSE396")
