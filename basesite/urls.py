from django.urls import path
from .views import home, RegistrationView

urlpatterns = [
    path("", home, name="home"),
    path("register/", RegistrationView.as_view(), name="register"),
]
