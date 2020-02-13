from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from .models import Users
from .serializers import UsersSerializer

class BaseViewTest(APITestCase):
        client = APIClient()

        @staticmethod
        def create_user(name="", email="", instructor=False, course=""):
                if name != "" and email != "" and course != "":
                        Users.objects.create(name=name, email=email, instructor=instructor, course=course)

        def setUp(self):
                self.create_user("Andy", email="andy@gmail.com", instructor=True, course="CSE442")
                self.create_user("Aaron", email="aaron@gmail.com", instructor=False, course="CSE191")
                self.create_user("Huss", email="andy@gmail.com", instructor=False, course="CSE396")

class AllUserTest(BaseViewTest):
        def test_get_all_users(self):
                response = self.client.get(reverse("users-list"))

                expected = Users.objects.all()
                serialized = UsersSerializer(expected, many=True)
                self.assertEqual(response.data, serialized.data)
                self.assertEqual(response.status_code, status.HTTP_200_OK)
