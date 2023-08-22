from django.shortcuts import render
from rest_framework import generics, status
from .serializers import EmailSerializer, CreateEmailSerializer
from .models import Email
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
import openai
import numpy as np
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
import time
from django.http import JsonResponse

# Create your views here.
openai.api_key =  settings.API_KEY
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


@api_view(['POST'])
def calculate_meal_plan(request):
    # Predefined data
    ingredients = [
        {'name': 'Oatmeal', 'values': [20, 5, 2]},
        {'name': 'Chicken Salad', 'values': [10, 20, 8]},
        {'name': 'Grilled Salmon', 'values': [0, 25, 10]},
    ]
    targets = [120, 180, 60]

    # Convert ingredients and targets to NumPy arrays
    M = np.array([item['values'] for item in ingredients])
    T = np.array(targets)

    # Calculate the pseudoinverse of M
    M_pinv = np.linalg.pinv(M)

    # Solve for the amounts
    A = np.dot(M_pinv, T)

    # Calculate new total for each macronutrient
    new_totals = np.dot(M.T, A)

    # Construct response data
    amounts = [{**item, 'amount': round(amount, 2)} for item, amount in zip(ingredients, A)]
    response_data = {
        'amounts': amounts,
        'new_totals': new_totals.tolist()
    }
    
    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['POST', 'GET'])
def generate_meal_plan(request):

    default = [
        {
            "role": "system",
            "content": "You are nutrient table generator, you are using European measurement system, you should be detailed and give info for each meal",
        },
        {
            "role": "user",
            "content": "Please generate a meal plan for a week with 5 meals a day, 200g protein, 50g fats, 100g carbs per day",
        },
    ]

    messages = request.data.get('messages', default)

    # Number of retry attempts
    max_retries = 3
    retry_delay = 2  # seconds

    for attempt in range(max_retries):
        try:
            # create completion with OpenAI

            completion = openai.ChatCompletion.create(
                # model="gpt-3.5-turbo-16k",
                model="gpt-4",
                messages=messages
            )

            # If successful, return response
            return JsonResponse({'message': completion.choices[0].message})

        except openai.error as e:
            # If it's the last attempt, return an error in JSON format
            if attempt == max_retries - 1:
                return JsonResponse({'error': str(e)}, status=500)

            # Otherwise, wait and try again
            time.sleep(retry_delay)

    # If all attempts failed, you can return a generic error response (optional)
    return JsonResponse({'error': 'Unable to generate meal plan after multiple attempts'}, status=500)


class SendEmailView(APIView):
    def post(self, request, format=None):
        data = request.data

        print(data)
        # You may want to add validation to check if these fields exist in the data
        # subject = data['subject']
        # message = data['message']
        subject = "Fitness Guru - Meal Plan"
        # message = "Here is your meal plan for the week"
        to_email = data['to_email']
        # to_email = "martin.staresincic@gmail.com"
        text_content = data['message']
        html_content = data['html']
        
        try:
            msg = EmailMultiAlternatives(subject, text_content, to=[to_email])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            return Response({'status': 'Email sent'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)