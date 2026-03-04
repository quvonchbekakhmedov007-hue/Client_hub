from django.shortcuts import render, redirect
from .forms import ClientForm
from .models import Customer




def Client_form(request):
    if request.method == 'POST':
        form = ClientForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('Client_form')
    else:
        form = ClientForm()

    customers = Customer.objects.all()  # ← bazadan o'qish

    ctx = {
        'form':             form,
        'customers':        customers,   # ← templatega yuborish
        'status_choices':   Customer.STATUS_CHOICES,
        'count_all'     :   Customer.objects.count() ,
        'active_count'  :   Customer.objects.filter(status='active').count(),
        'category_choices': Customer.CATEGORY_CHOICES,
        'city_choices':     Customer.CITY_CHOICES,
    }
    return render(request, 'index.html', ctx)