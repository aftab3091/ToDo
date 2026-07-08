from django.shortcuts import render
from django.http import JsonResponse
from .db import task_collection
from django.views.decorators.csrf import csrf_exempt
import json
from bson import ObjectId

# GET ALL TASKS
def get_tasks(request):
    tasks = []
    for task in task_collection.find():
        task["_id"] = str(task["_id"])
        tasks.append(task)
    return JsonResponse(tasks, safe=False)


# ADD TASK
@csrf_exempt
def add_task(request):
    if request.method == "POST":
        data = json.loads(request.body)
        task_collection.insert_one(data)
        return JsonResponse({"message": "Task Added"})


# UPDATE TASK
@csrf_exempt
def update_task(request, id):
    if request.method == "PUT":
        data = json.loads(request.body)
        task_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": data}
        )
        return JsonResponse({"message": "Task Updated"})


# DELETE TASK
@csrf_exempt
def delete_task(request, id):
    if request.method == "DELETE":
        task_collection.delete_one({"_id": ObjectId(id)})
        return JsonResponse({"message": "Task Deleted"})
# Create your views here.
