# # from django.contrib import admin
# # from .models import Event, Registration



# # @admin.register(Event)
# # class EventAdmin(admin.ModelAdmin):
# #     list_display = ('title', 'date', 'location', 'capacity', 'created_by')


# # @admin.register(Registration)
# # class RegistrationAdmin(admin.ModelAdmin):
# #     list_display = ('user', 'event')





# from django.contrib import admin
# from django.contrib.auth import get_user_model
# from django.contrib.auth.admin import UserAdmin
# from .models import Event, Registration

# User = get_user_model()

# admin.site.register(User, UserAdmin)


# @admin.register(Event)
# class EventAdmin(admin.ModelAdmin):
#     list_display = ('title', 'date', 'location', 'capacity', 'created_by')


# @admin.register(Registration)
# class RegistrationAdmin(admin.ModelAdmin):
#     list_display = ('user', 'event')





from django.contrib import admin
from .models import Event, Registration

# Note: We REMOVED the User registration from here because 
# it is already handled in your accounts app.

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location', 'capacity', 'created_by')
    search_fields = ('title', 'location')
    list_filter = ('date',)

@admin.register(Registration)
class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'registered_at', 'checked_in')
    list_filter = ('checked_in', 'event')