# My To Do App in Django

This is a Django project that runs a To Do app. It is still a work in progress and hardly a MVP.

## Usage

After cloning this repo:

With `uv` (Recommended)

    curl -LsSf https://astral.sh/uv/install.sh | sh
    uv venv         # Create a virtual environment
    uv pip install -e .  # For editable install if needed or
    uv pip install -r pyproject.toml

With `pip` 

    python -m venv .venv
    source .venv/bin/activate  # On Windows: .venv\Scripts\activate
    pip install --upgrade pip setuptools wheel

    pip install -e .  # Editable install
    pip install -r requirements.txt  # If provided

Then the usual Django commands:

    py manage.py createsuperuser
    py manage.py makemigrations
    py manage.py migrate
    py manage.py runserver

Then navigate to localhost:8000/tasks

Enjoy!