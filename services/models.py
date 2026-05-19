from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=150)
    short_description = models.TextField()
    detailed_description = models.TextField()
    icon_svg = models.TextField(blank=True, help_text="Paste SVG code here")
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
