from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, User, Feedback
from forms import UserRegisterForm, UserLoginForm, FeedbackForm
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://bloglyuser:bloglypassword@localhost/flask_feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


connect_db(app)

toolbar = DebugToolbarExtension(app)

@app.route('/')
def home_page():
    """Redirect to /register."""
    return redirect('/register')

@app.route('/register', methods=['GET', 'POST'])
def register_user():
    form = UserRegisterForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        new_user = User.register(username, password, email, first_name, last_name)

        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken.  Please pick another')
            return render_template('register.html', form=form)
        session['username'] = new_user.username
        flash('Welcome! Successfully Created Your Account!', "success")
        
        return redirect(f'/users/{new_user.username}')
    
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login_user():
    form = UserLoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.authenticate(username, password)
        if user:
            flash(f"Welcome Back, {user.username}!", "primary")
            session['username'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Invalid username/password.']

    return render_template('login.html', form=form)


@app.route('/logout')
def logout_user():
    session.pop('username')
    flash("Goodbye!", "info")
    return redirect('/')

@app.route('/users/<username>')
def show_user_profile(username):
    if "username" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')
    user = User.query.filter_by(username=username).first()
    return render_template('user_profile.html', user=user)

@app.route('/users/<username>/delete', methods=["POST"])
def delete_user(username):
    if "username" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')
    user = User.query.filter_by(username=username).first()
    feedback = Feedback.query.filter_by(username=username).first()
    db.session.delete(user)
    db.session.delete(feedback)
    db.session.commit()
    session.pop("username")
    
    flash('User deleted successfully!', 'success')
    return redirect('/')

@app.route("/users/<username>/feedback/add", methods=["GET", "POST"])
def add_feedback(username):
    if "username" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')
    
    form = FeedbackForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(title=title, 
                            content=content, 
                            username=username)
        db.session.add(feedback)
        db.session.commit()
        return redirect(f'/users/{feedback.username}')
    
    return render_template("add_feedback.html", form=form)

@app.route("/feedback/<int:feedback_id>/update", methods=["GET", "POST"])
def update_feedback(feedback_id):

    feedback = Feedback.query.get_or_404(feedback_id)

    if "username" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')

    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()

        return redirect(f'/users/{feedback.username}')

    return render_template("edit_feedback.html", form=form)

@app.route("/feedback/<int:feedback_id>/delete", methods=["POST"])
def delete_feedback(feedback_id):

    feedback = Feedback.query.get_or_404(feedback_id)

    if "username" not in session:
        flash("Please login first!", "danger")
        return redirect('/login')
    
    db.session.delete(feedback)
    db.session.commit()
    return redirect(f'/users/{feedback.username}')