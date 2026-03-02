from .views import Client_form
from django.urls import path

urlpatterns=[
    path('',Client_form,name='Client_form')
]