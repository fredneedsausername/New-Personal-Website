from flask import Flask, render_template, request
import os
from datetime import datetime
import markdown
import bleach

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/custom-website-license')
def custom_website_license():
    return 200

# Get newest blog posts first
# Manually constructed cards for maximum aesthetic result
# use pagination
@app.route('/projects')
def projects():
    return 404

# Parse markdown file and turn it into html
@app.route('/projects/<project_name>')
def project_detail(project_name):
    return 404

# Get newest blog posts first
# Parse markdown title and header and put into html card
# use pagination
@app.route('/blog')
def blog():
    return 404

# Parse markdown file and turn it into html
@app.route('/blog/<post_name>')
def blog_post(post_name):
    markdown_text = "Helo"
    html_from_markdown = markdown.markdown(markdown_text)
    sanitized_html = bleach.clean(html_from_markdown)
    return render_template("blog_post.html", article=sanitized_html)

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)