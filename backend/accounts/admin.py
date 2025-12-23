from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    # This adds the fields to the list view in the admin
    list_display = ('username', 'email', 'role', 'department', 'is_staff')
    
    # This adds the fields to the "Edit User" page
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('role', 'department')}),
    )
    
    # This adds the fields to the "Add User" page
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Custom Fields', {'fields': ('role', 'department')}),
    )

admin.site.register(User, CustomUserAdmin)