from django.urls import path
from . import views

urlpatterns = [
    path('tasks/', views.get_tasks),
    path('tasks/add/', views.add_task),
    path('tasks/update/<str:id>/', views.update_task),
    path('tasks/delete/<str:id>/', views.delete_task),
]