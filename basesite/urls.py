from django.urls import path
from .views import home
# from .views import IndexView

urlpatterns = [
    path("", home, name="home"),
    # path("", IndexView.as_view(), name="home")
]
