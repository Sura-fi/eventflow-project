# accounts/serializers.py
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # This is what puts 'ORGANIZER' into the response
        data['role'] = self.user.role 
        data['username'] = self.user.username
        return data