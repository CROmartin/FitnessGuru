from django.shortcuts import render
from django.conf import settings
# Create your views here.
def index(request, *args, **kwargs):
    context = {
        'API_KEY': settings.API_KEY,
        'API_KEY2': settings.API_KEY2,
    }
    return render(request, 'frontend/index.html', context)