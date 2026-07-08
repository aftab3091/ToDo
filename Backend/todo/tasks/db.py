from pymongo import MongoClient

client = MongoClient("mongodbURI")

db = client["todo_db"]
task_collection = db["tasks"]