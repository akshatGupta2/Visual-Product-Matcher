from VisualDisp import db


class Products(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String, nullable=False)
    category = db.Column(db.String)
    local_path = db.Column(db.String)
    embedding = db.Column(db.LargeBinary)
    
    def __repr__(self):
        return f"Product ({self.id}, '{self.name}', '{self.category}', '{self.embedding}')\n"

