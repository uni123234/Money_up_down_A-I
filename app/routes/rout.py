from flask import Flask, render_template

app = Flask(__name__)

# не забути добавити адмін сторону


@app.rout('/')
def index():
    render_template()


@app.route('login')
def login():
    render_template()


@app.route('/singup')
def reg():
    render_template()


@app.route('/income')
def income():
    render_template()


@app.route('/expense')
def expense():
    render_template()


if __name__ == '__main__':
    app.run(debug=True, host='1.1.1.1')
