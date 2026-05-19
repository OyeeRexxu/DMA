import os
import django
import shutil
from pathlib import Path
from django.core.files import File

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_agency.settings')
django.setup()

from projects.models import Project
from services.models import Service

def populate():
    print("Clearing existing data...")
    Project.objects.all().delete()
    Service.objects.all().delete()

    print("Creating Services...")
    services_data = [
        {"title": "Brand Strategy", "short_description": "We architect the core positioning, voice, and visual identity that allows your brand to dominate the market."},
        {"title": "Digital Production", "short_description": "Cinematic video, high-end photography, and cutting-edge 3D motion graphics built to captivate."},
        {"title": "AI & Technology", "short_description": "Leveraging generative AI and custom web applications to build scalable, high-performance digital ecosystems."}
    ]
    
    for i, data in enumerate(services_data):
        Service.objects.create(
            title=data["title"],
            short_description=data["short_description"],
            detailed_description="Detailed service description goes here. " * 5,
            order=i
        )

    images = [
        r"C:\Users\hp\.gemini\antigravity\brain\2d64a3a3-8084-4425-832b-5716a295f94e\project_1_fashion_1777896254100.png",
        r"C:\Users\hp\.gemini\antigravity\brain\2d64a3a3-8084-4425-832b-5716a295f94e\project_2_tech_1777895855520.png",
        r"C:\Users\hp\.gemini\antigravity\brain\2d64a3a3-8084-4425-832b-5716a295f94e\project_3_art_1777896523834.png"
    ]

    projects_data = [
        {"title": "Vogue Editorial", "client": "Conde Nast", "slug": "vogue-editorial"},
        {"title": "Nexus Dashboard", "client": "FinTech Corp", "slug": "nexus-dashboard"},
        {"title": "Ethereal Worlds", "client": "Digital Art Gala", "slug": "ethereal-worlds"}
    ]

    for i, data in enumerate(projects_data):
        p = Project(
            title=data["title"],
            slug=data["slug"],
            client_name=data["client"],
            short_description="A high-end creative project.",
            content="Detailed case study content...",
            featured=True,
            order=i
        )
        
        img_path = images[i]
        if os.path.exists(img_path):
            with open(img_path, 'rb') as f:
                p.cover_image.save(os.path.basename(img_path), File(f), save=False)
        p.save()
        print(f"Created project: {p.title}")

if __name__ == '__main__':
    populate()
