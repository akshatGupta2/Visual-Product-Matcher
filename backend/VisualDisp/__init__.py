from flask import Flask
from .config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app(config=Config):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config)
    db.init_app(app=app)
    
    CORS(app=app)
    
    from .routes import routes_bp
    app.register_blueprint(routes_bp)
    
    return app