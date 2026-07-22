from django.shortcuts import render, HttpResponse
from django.views import generic
from django.contrib.auth import login
from django.urls import reverse_lazy
from .forms import RegistrationForm


def home(request):
    return render(request, "index.html")


class RegistrationView(generic.CreateView):
    form_class = RegistrationForm
    template_name = "registration/register.html"
    success_url = reverse_lazy("login")

    def form_valid(self, form):
        response = super().form_valid(form)
        login(self.request, self.object)
        return response

