from django.conf import settings


def site_context(request):
    """Inject site context into every template."""
    site_key = getattr(request, "site_key", None)

    scheme = "https" if request.is_secure() else "http"
    host = request.get_host()
    main_url = f"{scheme}://{host}/"

    return {
        "site_key": site_key,
        "main_url": main_url,
    }
