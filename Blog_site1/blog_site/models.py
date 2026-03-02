from django.db import models




class Customer(models.Model) :
    # Create your models here.
    STATUS_CHOICES = [
        ('active', 'Faol'),
        ('pending', 'Kutilmoqda'),
        ('vip', 'VIP'),
    ]

    CATEGORY_CHOICES = [
        ('retail', 'Retail'),
        ('wholesale', 'Wholesale'),
        ('vip', 'VIP'),
        ('korporativ', 'Korporativ'),
        ('online', 'Online'),
    ]

    CITY_CHOICES = [
        ('toshkent', 'Toshkent'),
        ('samarqand', 'Samarqand'),
        ('buxoro', 'Buxoro'),
        ('namangan', 'Namangan'),
        ('andijon', 'Andijon'),
        ('fargona', "Farg'ona"),
        ('qashqadaryo', 'Qashqadaryo'),
        ('surxondaryo', 'Surxondaryo'),
    ]

    # Maydonlar
    # avatar = models.CharField(max_length=10, default='👤')
    first_name=models.CharField(max_length=100, blank=False,null=False)
    last_name=models.CharField(max_length=100, blank=False, null=False)
    email=models.EmailField(max_length=100,unique=True, blank=False, null=False)
    phone_number=models.CharField(max_length=100, blank=False, null=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, blank=True)
    city= models.CharField(max_length=50, choices=CITY_CHOICES,     blank=True)
    notice=models.TextField()


    def __str__(self) :
      return f"{self.first_name} {self.last_name}"