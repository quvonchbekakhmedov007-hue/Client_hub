from django import forms
from .models import Customer

class ClientForm(forms.ModelForm):


    class Meta:
        model = Customer
        fields = [
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'city',
            'category',
            'status',
            'notice',
        ]
        # avatar ni olib tashladik — u ixtiyoriy