from django.conf import settings


def site_context(request):
    """Inject the current site key + meta into every template."""
    site_key = getattr(request, "site_key", None)
    
    # Dynamically determine base domain (e.g. localhost:8000, or mydomain.com)
    host = request.get_host()
    parts = host.split(".")
    subdomains = ["pulse", "atelier", "orbit", "signal", "quiet"]
    if parts[0] in subdomains:
        base_host = ".".join(parts[1:])
    else:
        base_host = host
        
    scheme = "https" if request.is_secure() else "http"
    
    # Generate URLs for all subdomains
    subdomain_urls = {}
    for sub in subdomains:
        subdomain_urls[sub] = f"{scheme}://{sub}.{base_host}/"
        
    # Also generate the url for the main domain
    main_url = f"{scheme}://{base_host}/"
    
    return {
        "site_key": site_key,
        "site_meta": settings.SITE_META.get(site_key, {}) if site_key else {},
        "all_sites": settings.SITE_META,
        "subdomain_urls": subdomain_urls,
        "main_url": main_url,
    }

