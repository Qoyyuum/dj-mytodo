from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    assigned_to = models.CharField(max_length=100, blank=True, null=True, default="")
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.title

    def mark_as_completed(self):
        self.completed = True
        self.save()

    def mark_as_incomplete(self):
        self.completed = False
        self.save()

    def update_description(self, new_description):
        self.description = new_description
        self.save()

    def assign_to(self, user):
        self.assigned_to = user
        self.save()

    def get_tasks(self):
        return Task.objects.filter(user=self.user).order_by("-created_at")
