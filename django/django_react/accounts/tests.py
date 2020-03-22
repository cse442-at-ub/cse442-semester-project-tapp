from django.test import TestCase
from django_react.models import User
from django.utils import timezone

class UserTest(TestCase):
        def create_user(self, name="test", email="helo@gmail.com", course="cse191"):
                return User.objects.create(name=name, email=email, course=course, created_at=timezone.now())

        def setUp(self):
                User.objects.create(name="andy", email="anrao3@buffalo.edu", course="CSE191", created_at=timezone.now())
                User.objects.create(name="huss", email="huss@buffalo.edu", course="CSE396", created_at=timezone.now())

        def test_user_create(self):
                u = self.create_user()
                u1 = User.objects.get(name="andy")
                u2 = User.objects.get(name="huss")
                self.assertTrue(isinstance(u, User))
                self.assertTrue(isinstance(u1, User))
                self.assertTrue(isinstance(u2, User))
                self.assertEqual(u1.name, "andy")
                self.assertEqual(u2.name, "huss")
                self.assertEqual(u1.email, "anrao3@buffalo.edu")
                self.assertEqual(u2.email, "huss@buffalo.edu")
                self.assertEqual(u1.course, "CSE191")
                self.assertEqual(u2.course, "CSE396")
