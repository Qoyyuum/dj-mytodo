from django.shortcuts import render, HttpResponse
# from django.template import loader

def home(request):
    return render(request, "index.html")

