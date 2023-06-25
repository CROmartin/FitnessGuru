from django.urls import path
from .views import EmailView, CreateEmailView, EmailList, GetEmails
# URLConf
urlpatterns = [
    path('email-view', EmailView.as_view(),  name='email_view'),
    path('email-list', EmailList.as_view(),  name='email_view'),
    path('emails', GetEmails.as_view(),  name='get_emails'),

    path('add-email', CreateEmailView.as_view()),

]