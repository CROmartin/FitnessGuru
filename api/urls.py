from django.urls import path
from .views import CreateTestersEmailView, GetTestersEmails, EmailView, CreateEmailView, EmailList, GetEmails, calculate_meal_plan, generate_meal_plan, SendEmailView

# URLConf

urlpatterns = [
    path('email-view', EmailView.as_view(),  name='email_view'),
    path('email-list', EmailList.as_view(),  name='email_view'),
    path('emails', GetEmails.as_view(),  name='get_emails'),
    path('send-email', SendEmailView.as_view(), name='send-email'),


    path('add-email', CreateEmailView.as_view()),

    path('testers-emails', GetTestersEmails.as_view(),  name='get_testers_emails'),
    path('add-testers-email', CreateTestersEmailView.as_view(),  name='add_testers_email'),


    path('calculate-meal-plan', calculate_meal_plan, name='calculate-meal-plan'),
    path('generate-meal-plan', generate_meal_plan, name='generate-meal-plan'),


]