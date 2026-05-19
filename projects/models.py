from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    client_name = models.CharField(max_length=150, blank=True)
    short_description = models.TextField(help_text="Shown on the grid")
    content = models.TextField(help_text="Full case study")
    cover_image = models.ImageField(upload_to='projects/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True, help_text="Vimeo or YouTube link")
    featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title
