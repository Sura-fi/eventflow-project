from django.urls import path
from .views import EventListCreateView, EventDetailView, RegisterEventView, MyRegistrationsView, EventAttendeesView, CheckInView

urlpatterns = [
    path('events/', EventListCreateView.as_view()),
    path('events/<int:pk>/', EventDetailView.as_view()),
    path('events/register/', RegisterEventView.as_view()),
    path("my-registrations/", MyRegistrationsView.as_view()),
    path("events/<int:event_id>/attendees/", EventAttendeesView.as_view()),
    path("check-in/<int:registration_id>/", CheckInView.as_view()),



]

