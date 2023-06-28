from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
DEFAULT_PHOTO_URL = "https://www.24petwatch.com/adobe/dynamicmedia/deliver/dm-aid--01a227f0-ed12-4a69-b0b8-dca307f02d6a/cat-image-new-529x540.png?preferwebp=true&quality=85"

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class Pet(db.Model):

    __tablename__ = "pets"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text, 
                          nullable=False, 
                          default=DEFAULT_PHOTO_URL)
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, nullable=False, default=True)