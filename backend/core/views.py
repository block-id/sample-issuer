from django.http.response import HttpResponse
from django.shortcuts import render

def frontend_app(request):
    return render(request, "react/base.html")
