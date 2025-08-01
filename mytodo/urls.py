from django.urls import path
from .views import (
    TaskListView,
    TaskDetailView,
    TaskCreateView,
    TaskUpdateView,
    TaskDeleteView,
    task_complete,
    task_incomplete,
)

app_name = "mytodo"
urlpatterns = [
    path("", TaskListView.as_view(), name="task_list"),
    path("task/<int:pk>/", TaskDetailView.as_view(), name="task_detail"),
    path("task/create/", TaskCreateView.as_view(), name="task_create"),
    path("task/<int:pk>/edit/", TaskUpdateView.as_view(), name="task_edit"),
    path("task/<int:pk>/delete/", TaskDeleteView.as_view(), name="task_delete"),
    path("task/<int:pk>/complete/", task_complete, name="task_complete"),
    path("task/<int:pk>/incomplete/", task_incomplete, name="task_incomplete"),
]
