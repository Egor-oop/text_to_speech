from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .convert import convert


class ConvertView(APIView):
    def post(self, request):
        text = request.data.get('text')
        try:
            c = convert(text['text'], text['lang'])
        except KeyError:
            return Response({'failed': 'Fields \'text\' and \'lang\' are required'})
        text['url'] = c
        return Response({'response': text}, status=status.HTTP_201_CREATED)
