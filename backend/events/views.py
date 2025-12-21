from django.shortcuts import render

# we are doing the events api here
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions
from rest_framework.generics import RetrieveAPIView
from rest_framework.exceptions import ValidationError
from .models import Event, Registration
from .serializers import EventSerializer, RegistrationSerializer
from .serializers import AttendeeSerializer
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied


class EventListCreateView(generics.ListCreateAPIView):

    queryset = Event.objects.all()

    serializer_class = EventSerializer
    permission_classes = []  # PUBLIC

class EventDetailView(RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class RegisterEventView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        event = serializer.validated_data['event']

        if Registration.objects.filter(user=self.request.user, event=event).exists():
            raise ValidationError("You already registered for this event.")
        
        if Registration.objects.filter(event=event).count() >= event.capacity:
            raise ValidationError("Event is full.")
        serializer.save(user=self.request.user)
        
class MyRegistrationsView(ListAPIView):
        permission_classes = [IsAuthenticated]
        serializer_class = RegistrationSerializer

        def get_queryset(self):
         return Registration.objects.filter(user=self.request.user)
        
class EventAttendeesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, event_id):
        event = Event.objects.get(id=event_id)

        if event.created_by != request.user:
            raise PermissionDenied("Not allowed")

        registrations = Registration.objects.filter(event=event)
        serializer = AttendeeSerializer(registrations, many=True)
        return Response(serializer.data)
    
class CheckInView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, registration_id):
        registration = Registration.objects.get(id=registration_id)

        if registration.event.created_by != request.user:
            raise PermissionDenied("Not allowed")

        registration.checked_in = True
        registration.save()

        return Response({"message": "Checked in successfully"})
