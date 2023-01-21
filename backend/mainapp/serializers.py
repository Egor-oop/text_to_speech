from rest_framework import serializers


class TextInputSerializer(serializers.Serializer):
    LANGUAGES = (
        ('ru', 'RU'),
        ('en', 'EN'),
    )
    text = serializers.CharField(max_length=500)
    lang = serializers.ChoiceField(choices=LANGUAGES)
