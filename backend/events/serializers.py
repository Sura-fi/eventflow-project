from rest_framework import serializers
from .models import Event , Registration

# class EventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Event
#         fields = '__all__'
#         read_only_fields = ('created_by', 'created_at')

# class RegistrationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Registration
#         fields = ['id', 'event']



from rest_framework import serializers
from .models import Event, Registration

# 1. DEFINE THIS FIRST
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'location', 'capacity']

    def get_attendee_count(self, obj):
        return obj.registration_set.count()

# 2. DEFINE THIS SECOND
class RegistrationSerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source="event.title", read_only=True)

    class Meta:
        model = Registration
        fields = ['id', 'event', 'event_title']

class AttendeeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Registration
        fields = ['id', 'username', 'checked_in']
