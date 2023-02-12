from gtts import gTTS
from datetime import datetime
import soundfile
import pyrubberband
import os

from pydub import AudioSegment
from pydub.effects import speedup


def convert(text: str, lang: str, speed: float) -> str:
    file = gTTS(text=text, lang=lang, slow=False)
    path = f'media/audio/{datetime.now()}.wav'
    file.save(path)
    if speed != 1.0:
        # y, sr = soundfile.read(path)
        # y_stretch = pyrubberband.time_stretch(y, sr, speed)
        # soundfile.write(path, y_stretch, sr, format='wav')
        audio = AudioSegment.from_file(path)
        audio = speedup(audio, playback_speed=speed, chunk_size=100, crossfade=200)
        audio.export(path, format='wav')
    return path
# { "text": { "text": "Если ты нормальный нажми 1234", "lang": "ru", "speed": 1.5 } }
