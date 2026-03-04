from django import forms
from .models import Customer

class ClientForm(forms.ModelForm):


    class Meta:
        model = Customer
        fields ="__all__"
        # avatar ni olib tashladik — u ixtiyoriy