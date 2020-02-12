from django.urls import path, include

urlpatterns = [
        path('api/lead/', views.LeadListCreate.as_view() ),
]
