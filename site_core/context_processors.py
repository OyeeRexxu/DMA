from django.conf import settings


def site_context(request):
    """Inject variant path URLs into every template context."""
    site_key = getattr(request, "site_key", None)

    # Build simple path-based URLs for each variant (v9–v13)
    variant_paths = getattr(settings, "VARIANT_PATHS", {})
    scheme = "https" if request.is_secure() else "http"
    host = request.get_host()
    base_origin = f"{scheme}://{host}"

    # subdomain_urls kept for backwards-compat with old templates,
    # now points to /vN/ paths on the same host
    subdomain_urls = {
        name: f"{base_origin}/{prefix}/"
        for name, prefix in variant_paths.items()
    }

    # main_url is always the root of the current host
    main_url = f"{base_origin}/"

    return {
        "site_key": site_key,
        "site_meta": settings.SITE_META.get(site_key, {}) if site_key else {},
        "all_sites": settings.SITE_META,
        "subdomain_urls": subdomain_urls,
        "main_url": main_url,
    }
