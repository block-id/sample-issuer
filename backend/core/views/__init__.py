from django.http.response import HttpResponse
from django.shortcuts import render

from . import adhaar_requests, sign_challenge

def frontend_app(request):
    return render(request, "react/base.html")
