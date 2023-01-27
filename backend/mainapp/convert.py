from gtts import gTTS
import pyttsx3
from datetime import datetime


def convert(text: str, lang: str) -> str:
    file = gTTS(text=text, lang=lang, slow=False)
    path = f'media/audio/{datetime.now()}.wav'
    file.save(path)
    return path