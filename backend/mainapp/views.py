from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from .convert import convert


class ConvertView(APIView):
    def post(self, request):
        text = request.data.get('text')
        try:
            c = convert(text['text'], text['lang'], speed=text['speed'])
        except KeyError:
            return Response({'failed': 'Fields \'text\', \'lang\' and \'speed\' are required'},
                            HTTP_400_BAD_REQUEST)
        text['url'] = c
        return Response({'response': text}, status=HTTP_201_CREATED)
