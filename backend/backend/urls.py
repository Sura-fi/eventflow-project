from django.contrib import admin
from django.urls import path, include 
from accounts.views import MyTokenObtainPairView 

urlpatterns = [
    path('admin/', admin.site.urls),
    # 3. Use your custom view here
    path('api/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/', include('events.urls')),
]