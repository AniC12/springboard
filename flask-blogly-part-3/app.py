"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User, Post, Tag

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

"""Users routes"""

@app.route("/")
def show_home_page():
    """Redirects to the users list"""

    return redirect("/users")

@app.route("/users")
def list_users():
    """Show users list"""

    users = User.query.all()
    return render_template("users/index.html", users=users)

@app.route("/users/new")
def show_create_form():
    """Show an add form for users"""
    return render_template("users/new.html")

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
    posts = db.session.query(Post).filter_by(user_id=user_id)
    return render_template('users/detail.html', user=user, posts = posts)


@app.route('/users/<int:user_id>/edit')
def show_edit_form(user_id):
    """Show the edit page for a user"""

    user = User.query.get_or_404(user_id)
    return render_template('users/edit.html', user=user)


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


"""Posts routes"""

@app.route('/users/<int:user_id>/posts/new')
def new_post_form(user_id):
    """Show form to add a post for that user. """

    user = User.query.get_or_404(user_id)
    tags = Tag.query.all()
    return render_template('posts/new.html', user=user, tags=tags)


@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def add_post(user_id):
    """Handle add form; add post and redirect to the user detail page."""

    title = request.form['title']
    content = request.form['content']
    tag_ids = request.form.getlist('tags')
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    post = Post(title=title, content=content, user_id=user_id, tags=tags)

    db.session.add(post)
    db.session.commit()

    return redirect(f"/users/{user_id}")


@app.route('/posts/<int:post_id>')
def show_post(post_id):
    """Show a post. Show buttons to edit and delete the post."""

    post = Post.query.get_or_404(post_id)
    user_id=post.user_id
    user = User.query.get_or_404(user_id)
    return render_template('posts/detail.html', post=post, user=user)


@app.route('/posts/<int:post_id>/edit')
def post_edit_form(post_id):
    """Show form to edit a post, and to cancel (back to user page)."""

    post = Post.query.get_or_404(post_id)
    tags = Tag.query.all()
    return render_template('posts/edit.html', post=post, tags=tags)


@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def edit_post(post_id):
    """Handle editing of a post. Redirect back to the post view."""

    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content=request.form['content']
    tag_ids = [int(num) for num in request.form.getlist("tags")]
    post.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    db.session.add(post)
    db.session.commit()

    return redirect(f"/posts/{post_id}")


@app.route('/posts/<int:post_id>/delete', methods=["POST"])
def delete_post(post_id):
    """Delete the post."""

    post = Post.query.get_or_404(post_id)

    db.session.delete(post)
    db.session.commit()

    return redirect(f"/users/{post.user_id}")


"""Tags routes"""

@app.route("/tags")
def list_tags():
    """Lists all tags"""

    tags = Tag.query.all()
    return render_template("tags/list.html", tags=tags)

@app.route('/tags/<int:tag_id>')
def show_tag(tag_id):
    """Show detail about a tag"""

    tag = Tag.query.get_or_404(tag_id)
    return render_template('tags/detail.html', tag=tag)

@app.route("/tags/new")
def show_create_tag_form():
    """Shows a form to add a new tag."""

    return render_template("tags/new.html")

@app.route("/tags/new", methods=["POST"])
def add_tag():
    """Process add form, adds tag, and redirect to tag list."""
    
    name = request.form['name']
    tag = Tag(name=name)

    db.session.add(tag)
    db.session.commit()

    return redirect("/tags")

@app.route('/tags/<int:tag_id>/edit')
def show_tag_edit_form(tag_id):
    """Show edit form for a tag"""

    tag = Tag.query.get_or_404(tag_id)
    return render_template('tags/edit.html', tag=tag)

app.route('/tags/<int:tag_id>/edit', methods=["POST"])
def edit_tag(tag_id):
    """Process edit form, edit tag, and redirects to the tags list."""

    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.form['name']

    db.session.add(tag)
    db.session.commit()

    return redirect("/tags")

@app.route('/tags/<int:tag_id>/delete', methods=["POST"])
def delete_tag(tag_id):
    """Delete the tag."""

    tag = Tag.query.get_or_404(tag_id)

    db.session.delete(tag)
    db.session.commit()

    return redirect("/tags")