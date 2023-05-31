from flask import Flask, request, render_template,  redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)

app.config['SECRET_KEY'] = "mysecretkey"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)


@app.route('/')
def show_start():
    "Shows starter page"

    return render_template("start_page.html", survey=survey)

@app.route('/begin', methods=["POST"])
def begin_survey():

    session['responses'] = []

    return redirect("/questions/0")


@app.route('/questions/<int:quest_index>')
def show_question(quest_index):
    "Shows current question"

    if quest_index != len(session['responses']):
       flash("You are trying to access an invalid question")
       r = session['responses']
       return redirect(f'/questions/{len(r)}')
    
    if len(session['responses']) == len(survey.questions):
        return redirect("/end")
    
    question = survey.questions[quest_index]
    return render_template("question.html", question=question)
    

@app.route('/answer', methods=["POST"])
def get_answer():
    "Handling Answers"

    choice = request.form["answer"]
    
    r = session['responses']
    r.append(choice)
    session['responses'] = r
    
    return redirect(f'/questions/{len(r)}')


@app.route('/end')
def show_end():
    "Shows end page"

    return render_template("end.html")