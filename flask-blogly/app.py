"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://bloglyuser:bloglypassword@localhost/blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


connect_db(app)

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

db.create_all()

@app.route("/")
def show_home_page():
    """Redirects to the users list"""

    return redirect("/users")

@app.route("/users")
def list_users():
    """Show users list"""

    users = User.query.all()
    return render_template("index.html", users=users)

@app.route("/users/new")
def show_create_form():
    """Show an add form for users"""
    return render_template("new.html")

@app.route("/users/new", methods=["POST"])
def add_user():
    """Process the add form, adding a new user and going back to /users"""
    
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url'] or None

    user = User(first_name=first_name, last_name=last_name, image_url=image_url)
    db.session.add(user)
    db.session.commit()

    return redirect("/users")

@app.route('/users/<int:user_id>')
def show_user(user_id):
    """Show information about the given user"""

    user = User.query.get_or_404(user_id)
    return render_template('detail.html', user=user)


@app.route('/users/<int:user_id>/edit')
def show_edit_form(user_id):
    """Show the edit page for a user"""

    user = User.query.get_or_404(user_id)
    return render_template('edit.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=["POST"])
def edit_user(user_id):
    """Process the edit form, returning the user to the /users page."""

    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name=request.form['last_name']

    db.session.add(user)
    db.session.commit()

    return redirect("/users")

@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    """Delete the user."""

    user = User.query.get_or_404(user_id)

    db.session.delete(user)
    db.session.commit()

    return redirect("/users")
