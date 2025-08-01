from django.contrib import admin
from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("title", "completed", "created_at", "updated_at", "assigned_to")
    search_fields = ("title", "description", "assigned_to")
    list_filter = ("completed", "created_at", "updated_at")
    ordering = ("-created_at",)

    # def get_queryset(self, request):
    #     return super().get_queryset(request).select_related('assigned_to')
