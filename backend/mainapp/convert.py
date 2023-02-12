from gtts import gTTS
from datetime import datetime
from pydub import AudioSegment
from pydub.effects import speedup


def change_speed(file: str, speed: float) -> None:
    audio = AudioSegment.from_file(file)
    audio = speedup(audio, playback_speed=speed, chunk_size=120, crossfade=40)
    audio.export(file, format='wav')


def convert(text: str, lang: str, speed: float) -> str:
    file = gTTS(text=text, lang=lang, slow=False)
    path = f'media/audio/{datetime.now()}.wav'
    file.save(path)
    if speed != 1.0:
        change_speed(path, speed)
    return path
