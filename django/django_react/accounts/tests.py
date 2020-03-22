from django.test import TestCase
from django_react.models import User
from django.utils import timezone
from django.contrib.auth import get_user_model

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


class UsersManagersTests(TestCase):

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email='normal@user.com', password='foo')
        self.assertEqual(user.email, 'normal@user.com')
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email='')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', password="foo")

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser('super@user.com', 'foo')
        self.assertEqual(admin_user.email, 'super@user.com')
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email='super@user.com', password='foo', is_superuser=False)