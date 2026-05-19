from django.shortcuts import render, redirect
from django.contrib import messages
from .models import ContactMessage

def contact_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        company = request.POST.get('company', '')
        message = request.POST.get('message')
        
        if name and email and message:
            ContactMessage.objects.create(
                name=name, email=email, company=company, message=message
            )
            messages.success(request, "Your message has been sent. We'll be in touch soon.")
            return redirect('contact:form')
        else:
            messages.error(request, "Please fill out all required fields.")
            
    return render(request, 'contact/form.html')
