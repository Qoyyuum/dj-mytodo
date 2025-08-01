from django.views import generic
from django.shortcuts import redirect
from .models import Task
from .forms import TaskForm


class TaskListView(generic.ListView):
    model = Task
    template_name = "task_list.html"
    context_object_name = "tasks"

    def get_queryset(self):
        return Task.get_tasks(self)


class TaskDetailView(generic.DetailView):
    model = Task
    template_name = "task_detail.html"
    context_object_name = "task"


class TaskCreateView(generic.CreateView):
    model = Task
    template_name = "task_form.html"
    form_class = TaskForm
    success_url = "/tasks/"

    def form_valid(self, form):
        return super().form_valid(form)


class TaskUpdateView(generic.UpdateView):
    model = Task
    template_name = "task_form.html"
    form_class = TaskForm
    context_object_name = "task"
    success_url = "/tasks/"

    def form_valid(self, form):
        return super().form_valid(form)


class TaskDeleteView(generic.DeleteView):
    model = Task
    template_name = "task_confirm_delete.html"
    success_url = "/tasks/"

    def get_object(self, queryset=None):
        return super().get_object(queryset=queryset)


def task_complete(request, pk):
    task = Task.objects.get(pk=pk)
    task.mark_as_completed()
    return redirect("mytodo:task_list")


def task_incomplete(request, pk):
    task = Task.objects.get(pk=pk)
    task.mark_as_incomplete()
    return redirect("mytodo:task_list")
