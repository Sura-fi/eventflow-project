from rest_framework import serializers
from .models import Event , Registration


# # 1. DEFINE THIS FIRST
# class EventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Event
#         fields = ['id', 'title', 'description', 'date', 'location', 'capacity']

#     def get_attendee_count(self, obj):
#         return obj.registration_set.count()


# 1. DEFINE THIS FIRST
class EventSerializer(serializers.ModelSerializer):
    # This must be ReadOnly so React doesn't have to send a User ID
    created_by = serializers.ReadOnlyField(source='created_by.username')
    attendee_count = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'location', 'capacity', 'created_by', 'attendee_count']

    def get_attendee_count(self, obj):
        # This matches your model's relationship
        return Registration.objects.filter(event=obj).count()

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
