from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import OHQueue
from accounts.serializers import UserSerializer
from officehours.serializer import EventSerializer

class OHQueueSerializer(serializers.ModelSerializer):
    teachingAssist = UserSerializer()
    officeHour = EventSerializer()
    id = serializers.CharField(read_only = True)
    queue = serializers.ListField(child = UserSerializer())
    class Meta:
        model = OHQueue
        fields = ('officeHour', 'queue','teachingAssist', 'classNum', "id")
        
        def create(self, validated_data):
            tchingAsst = OHQueue.objects.create(**validated_data['teachingAssist'])
            offceHr = OHQueue.objects.create(**validated_data['officeHour'])
            qee = OHQueue.objects.create(**validated_data['queue'])
            return OHQueue.objects.create(teachingAssist=tchingAsst,officeHour=offceHr,classNum = validated_data['classNum'],queue=qee)


