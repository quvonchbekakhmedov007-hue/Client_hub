from django.shortcuts import render, redirect
from .forms import ClientForm
from .models import Customer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


def Client_form(request):
    if request.method == 'POST':
        form = ClientForm(request.POST)
        print("post keldi")
        print(form.request)
        if form.is_valid():
            form.save()
            return redirect('Client_form')
        else:
            print("xato",form.errors)
    else:
        form = ClientForm()  # ← bo'sh forma

    ctx = {
        'form': form,
        'status_choices': Customer.STATUS_CHOICES,  # ← shu kerak
        'category_choices': Customer.CATEGORY_CHOICES,  # ← shu kerak
        'city_choices': Customer.CITY_CHOICES,  # ← shu kerak
    }

    return render(request, 'index.html', ctx)