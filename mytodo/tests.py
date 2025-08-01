from django.test import TestCase
from django.urls import reverse
from .models import Task
from django.contrib.auth import get_user_model


class TaskModelTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="testuser", password="pass"
        )
        self.task = Task.objects.create(
            title="Test Task", description="Test Description", assigned_to=self.user
        )

    def test_task_content(self):
        self.assertEqual(self.task.title, "Test Task")
        self.assertEqual(self.task.description, "Test Description")
        self.assertEqual(self.task.assigned_to, self.user)

    def test_task_update_description(self):
        new_description = "Updated Description"
        self.task.update_description(new_description)
        self.assertEqual(self.task.description, new_description)

    def test_task_assign_to(self):
        new_user = get_user_model().objects.create_user(
            username="newuser", password="pass"
        )
        self.task.assign_to(new_user)
        self.assertEqual(self.task.assigned_to, new_user)

    def test_task_mark_as_completed(self):
        self.task.mark_as_completed()
        self.assertTrue(self.task.completed)

    def test_get_tasks(self):
        tasks = self.task.get_tasks()
        self.assertIn(self.task, tasks)
        self.assertEqual(tasks.count(), 1)

    def test_remove_task(self):
        self.task.delete()
        tasks = self.task.get_tasks()
        self.assertNotIn(self.task, tasks)


class TaskViewTest(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="testuser", password="pass"
        )
        self.task = Task.objects.create(
            title="Test Task", description="Test Description", assigned_to=self.user
        )

    def test_task_list_view(self):
        response = self.client.get(reverse("mytodo:task_list"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Task")

    def test_task_detail_view(self):
        response = self.client.get(reverse("mytodo:task_detail", args=[self.task.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Test Task")
