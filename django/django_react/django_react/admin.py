from django.contrib import admin
from .models import User

'''
class UserAdmin(admin.ModelAdmin):  # add this
  list_display = ('name', 'email', 'course', 'created_at')

admin.site.register(User, UserAdmin) # add this
'''
