from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.Serializer):
    startTime = serializers.CharField(max_length=50)
    endTime = serializers.CharField(max_length=50)
    allDay = serializers.BooleanField(default=False)
    classNum = serializers.CharField(max_length = 50)

    class Meta:
        model = Event

    def create(self, data):
        return Event.objects.create(**data)

    def update(self, instance, data):
        instance.startTime = data.get('startTime', instance.startTime)
        instance.endTime = data.get('endTime', instance.endTime)
        instance.allDay = data.get('allDay', instance.allDay)
        instance.classNum = data.get('classNum', instance.classNum)
        instance.save()
        return instance