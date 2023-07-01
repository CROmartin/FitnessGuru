from django.urls import path
from .views import index

urlpatterns = [
    path("", index),
    path("emails", index),
    path("generator", index)

]
