from pymongo import MongoClient

client = MongoClient("mongodb+srv://aftabali6896_db_user:Aftab%403091@cluster0.3b1fwvx.mongodb.net/?tls=true")

db = client["todo_db"]
task_collection = db["tasks"]