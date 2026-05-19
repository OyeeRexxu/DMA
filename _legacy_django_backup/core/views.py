from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from projects.models import Project
from services.models import Service
from contact.models import ContactMessage

# ── Original site ──────────────────────────────────────────
def home(request):
    return render(request, 'core/home.html', {
        'featured_projects': Project.objects.filter(featured=True)[:4],
        'services': Service.objects.all()[:3],
    })

# ── Shared context helpers ──────────────────────────────────
def _projects(): return Project.objects.filter(featured=True)[:6]
def _services(): return Service.objects.all()
def _all_projects(): return Project.objects.all()

def _handle_contact(request, redirect_name):
    if request.method == 'POST':
        name = request.POST.get('name','').strip()
        email = request.POST.get('email','').strip()
        company = request.POST.get('company','').strip()
        msg = request.POST.get('message','').strip()
        if name and email and msg:
            ContactMessage.objects.create(name=name, email=email, company=company, message=msg)
            messages.success(request, "Message received. We'll be in touch soon.")
        else:
            messages.error(request, "Please fill all required fields.")
        return redirect(redirect_name)
    return None

# ── Variant 1 – Cinematic Dark ─────────────────────────────
def variant_1(request):
    return render(request, 'variants/v1/home.html', {'projects': _projects(), 'services': _services()})
def v1_services(request):
    return render(request, 'variants/v1/services.html', {'services': _services()})
def v1_work(request):
    return render(request, 'variants/v1/work.html', {'projects': _all_projects()})
def v1_work_detail(request, slug):
    return render(request, 'variants/v1/detail.html', {'project': get_object_or_404(Project, slug=slug), 'related': _projects()})
def v1_contact(request):
    r = _handle_contact(request, 'v1_contact')
    if r: return r
    return render(request, 'variants/v1/contact.html')

# ── Variant 2 – Editorial Brutalist ────────────────────────
def variant_2(request):
    return render(request, 'variants/v2/home.html', {'projects': _projects(), 'services': _services()})
def v2_services(request):
    return render(request, 'variants/v2/services.html', {'services': _services()})
def v2_work(request):
    return render(request, 'variants/v2/work.html', {'projects': _all_projects()})
def v2_work_detail(request, slug):
    return render(request, 'variants/v2/detail.html', {'project': get_object_or_404(Project, slug=slug), 'related': _projects()})
def v2_contact(request):
    r = _handle_contact(request, 'v2_contact')
    if r: return r
    return render(request, 'variants/v2/contact.html')

# ── Variant 3 – Gradient Luxe ──────────────────────────────
def variant_3(request):
    return render(request, 'variants/v3/home.html', {'projects': _projects(), 'services': _services()})
def v3_services(request):
    return render(request, 'variants/v3/services.html', {'services': _services()})
def v3_work(request):
    return render(request, 'variants/v3/work.html', {'projects': _all_projects()})
def v3_work_detail(request, slug):
    return render(request, 'variants/v3/detail.html', {'project': get_object_or_404(Project, slug=slug), 'related': _projects()})
def v3_contact(request):
    r = _handle_contact(request, 'v3_contact')
    if r: return r
    return render(request, 'variants/v3/contact.html')

# ── Variant 4 – Type-First Minimal ─────────────────────────
def variant_4(request):
    return render(request, 'variants/v4/home.html', {'projects': _projects(), 'services': _services()})
def v4_services(request):
    return render(request, 'variants/v4/services.html', {'services': _services()})
def v4_work(request):
    return render(request, 'variants/v4/work.html', {'projects': _all_projects()})
def v4_work_detail(request, slug):
    return render(request, 'variants/v4/detail.html', {'project': get_object_or_404(Project, slug=slug), 'related': _projects()})
def v4_contact(request):
    r = _handle_contact(request, 'v4_contact')
    if r: return r
    return render(request, 'variants/v4/contact.html')

# ── Variant 5 – Neon Noir ──────────────────────────────────
def variant_5(request):
    return render(request, 'variants/v5/home.html', {'projects': _projects(), 'services': _services()})
def v5_services(request):
    return render(request, 'variants/v5/services.html', {'services': _services()})
def v5_work(request):
    return render(request, 'variants/v5/work.html', {'projects': _all_projects()})
def v5_work_detail(request, slug):
    return render(request, 'variants/v5/detail.html', {'project': get_object_or_404(Project, slug=slug), 'related': _projects()})
def v5_contact(request):
    r = _handle_contact(request, 'v5_contact')
    if r: return r
    return render(request, 'variants/v5/contact.html')

# ── Variant 6 – Ultra Premium (Awwwards) ────────────────
def variant_6(request):
    return render(request, 'variants/v6/home.html', {'projects': _projects(), 'services': _services()})
def v6_services(request):
    return render(request, 'variants/v6/services.html', {'services': _services()})
def v6_work(request):
    return render(request, 'variants/v6/work.html', {'projects': _all_projects()})
def v6_work_detail(request, slug):
    return render(request, 'variants/v6/detail.html', {'project': get_object_or_404(Project, slug=slug), 'related': _projects()})
def v6_contact(request):
    r = _handle_contact(request, 'v6_contact')
    if r: return r
    return render(request, 'variants/v6/contact.html')

# ── Variant 7 – Pytia Particle Globe (GIF/Image Match) ───────
def variant_7(request):
    return render(request, 'variants/v7/home.html')

# ── Variant 8 – AlgoPros Geodesic Sphere (GIF Match) ─────────
def variant_8(request):
    return render(request, 'variants/v8/home.html')





