from gtts import gTTS
import pyttsx3
from datetime import datetime


def convert(text: str, lang: str) -> str:
    file = gTTS(text=text, lang=lang, slow=False)
    name = f'{datetime.now()}.wav'
    file.save(f"media/audio/{name}")
    return name
