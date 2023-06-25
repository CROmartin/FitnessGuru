from django.shortcuts import render
from rest_framework import generics
from .serializers import EmailSerializer, CreateEmailSerializer
from .models import Email
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class EmailView(generics.CreateAPIView): 
    queryset = Email.objects.all()
    serializer_class = EmailSerializer

class EmailList(generics.ListAPIView): 
    queryset = Email.objects.all()
    serializer_class = EmailSerializer

class GetEmails(APIView):
    serializer_class = EmailSerializer
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        emails = Email.objects.all()
        serializer = self.serializer_class(emails, many=True)
        return Response(serializer.data)

class CreateEmailView(APIView):
    serializer_class = CreateEmailSerializer
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            email = Email(name=name)
            email.save()
            return Response(EmailSerializer(email).data, status=status.HTTP_201_CREATED)
