from flask import Flask, request, render_template,  redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

responses = []

app = Flask(__name__)

app.config['SECRET_KEY'] = "mysecretkey"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)


@app.route('/')
def show_start():
    "Shows starter page"

    return render_template("start_page.html", survey=survey)


@app.route('/questions/<int:quest_index>')
def show_question(quest_index):
    "Shows current question"

    if quest_index != len(responses):
       flash("You are trying to access an invalid question")
       return redirect(f'/questions/{len(responses)}')
    
    if len(responses) == len(survey.questions):
        return redirect("/end")
    
    question = survey.questions[quest_index]
    return render_template("question.html", question=question)
    

@app.route('/answer', methods=["POST"])
def get_answer():
    "Handling Answers"

    choice = request.form["answer"]
    responses.append(choice)
    
    return redirect(f'/questions/{len(responses)}')


@app.route('/end')
def show_end():
    "Shows end page"

    return render_template("end.html")