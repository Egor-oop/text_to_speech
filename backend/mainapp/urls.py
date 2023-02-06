from django.urls import path

from .views import ConvertView

urlpatterns = [
    path('convert/', ConvertView.as_view(), name='convert'),
]
