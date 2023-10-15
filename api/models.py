from django.db import models

# Create your models here.
class Email(models.Model):
    name = models.CharField(max_length=50, unique=True)
    requested_on = models.DateTimeField(auto_now_add=True)

class TestersEmail(models.Model):
    name = models.CharField(max_length=50, unique=True)
    requested_on = models.DateTimeField(auto_now_add=True)

class APILog(models.Model):
    path = models.CharField(max_length=255)
    method = models.CharField(max_length=10)
    timestamp = models.DateTimeField()
    request_data = models.TextField(blank=True, null=True)  # Using TextField to accommodate large content
    response_data = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "API Log"
        verbose_name_plural = "API Logs"

    def __str__(self):
        return f"{self.method} {self.path} at {self.timestamp}"