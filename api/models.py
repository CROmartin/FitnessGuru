from django.db import models

# Create your models here.
class Email(models.Model):
    name = models.CharField(max_length=50, unique=True)
    requested_on = models.DateTimeField(auto_now_add=True)
