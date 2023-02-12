from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

client = APIClient()


class ConvertTTSTest(APITestCase):
    def setUp(self) -> None:
        self.valid_payload_en = {
            "text": {
                "text": "First Day as a Software Engineer",
                "lang": "en",
                "speed": 1.5
            }
        }

        self.invalid_payload_en = {
            "text": {
                "text": "First Day as a Software Engineer",
                "lang": "en"
            }
        }

        self.valid_payload_ru = {
            "text": {
                "text": "Если ты нормальный нажми 1234",
                "lang": "ru",
                "speed": 1.5
            }
        }

        self.invalid_payload_ru = {
            "text": {
                "text": "Если ты нормальный нажми 1234",
                "lang": "ru"
            }
        }

    def test_convert_valid_payload_en(self):
        response = client.post(
            reverse('convert'),
            self.valid_payload_en,
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_convert_invalid_payload_en(self):
        response = client.post(
            reverse('convert'),
            self.invalid_payload_en,
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_convert_valid_payload_ru(self):
        response = client.post(
            reverse('convert'),
            self.valid_payload_ru,
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_convert_invalid_payload_ru(self):
        response = client.post(
            reverse('convert'),
            self.invalid_payload_en,
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
