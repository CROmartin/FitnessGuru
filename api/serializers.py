from rest_framework import serializers
from .models import Email, TestersEmail


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ('name', 'requested_on')


class CreateEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ('name', 'requested_on')
    def create(self, validated_data):
        return Email.objects.create(**validated_data)
    
class TestersEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestersEmail
        fields = ('name', 'requested_on')
class CreateTestersEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestersEmail
        fields = ('name', 'requested_on')
    def create(self, validated_data):
        return TestersEmail.objects.create(**validated_data)