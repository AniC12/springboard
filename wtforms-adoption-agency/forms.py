from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, BooleanField, SelectField
from wtforms.validators import InputRequired, Optional, URL, NumberRange

class AddPetForm(FlaskForm):
    """Form for adding pets."""

    name = StringField("Pet Name")
    species = SelectField("Species", choices= [("cat", "Cat"), ("dog", "Dog"), ("porcupine", "Porcupine")])
    photo_url = StringField("Photo URL", validators=[URL(), Optional()])
    age = IntegerField("Age", 
                       validators=[Optional(), NumberRange(min=0, max=30)])
    notes = TextAreaField("Notes")


class EditPetForm(FlaskForm):
    """Form for editing pets."""

    photo_url = StringField("Photo URL",
                            validators=[Optional(), URL()])
    notes = TextAreaField("Notes",
                          validators=[Optional()])
    available = BooleanField("Available")
    