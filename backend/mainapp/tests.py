from django.urls import reverse
from rest_framework.test import RequestsClient, APITestCase, CoreAPIClient, \
    APIRequestFactory, APIClient
from rest_framework import status

client = APIClient()


class ConvertTTSTest(APITestCase):
    def setUp(self) -> None:
        self.payload = {
            "text": {
                "text": "First Day as a Software Engineer",
                "lang": "en",
                "speed": 1.5
            }
        }

    # {
    #     "text": {
    #         "text": "Привет, человек!",
    #         "lang": "ru",
    #         "speed": 1.2
    #     }
    # }
    def test_convert_valid_payload_with_english(self):
        response = client.post(
            reverse('convert'),
            self.payload,
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
