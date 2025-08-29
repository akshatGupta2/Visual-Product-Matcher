from flask import Blueprint


routes_bp = Blueprint("routes_bp", __name__)

@routes_bp.route('/')
def greet():
    return {
        "Hello": "hello ji"
    }