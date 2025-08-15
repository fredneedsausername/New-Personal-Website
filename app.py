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
    # Read the LICENSE file
    try:
        with open('LICENSE', 'r', encoding='utf-8') as file:
            license_text = file.read()
    except FileNotFoundError:
        return 404
    
    # Convert markdown to HTML
    html_from_markdown = markdown.markdown(license_text, extensions=['fenced_code', 'tables'])
    
    # Sanitize HTML
    allowed_tags = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'b', 'i',
        'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'hr',
        'table', 'thead', 'tbody', 'th', 'td', 'tr'
    ]
    allowed_attributes = {
        'a': ['href', 'title', 'target'],
        'img': ['src', 'alt', 'title', 'width', 'height']
    }
    sanitized_html = bleach.clean(html_from_markdown, tags=allowed_tags, attributes=allowed_attributes)
    
    return render_template("custom_website_license.html", license_content=sanitized_html)

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

@app.route('/blog/<post_name>')
def blog_post(post_name):
    # Read your markdown file (adjust path as needed)
    try:
        with open(f'blog/posts/{post_name}.md', 'r', encoding='utf-8') as file:
            markdown_text = file.read()
    except FileNotFoundError:
        return 404
    
    # Convert markdown to HTML
    html_from_markdown = markdown.markdown(markdown_text, extensions=['fenced_code', 'tables'])
    
    # Sanitize HTML
    allowed_tags = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'b', 'i',
        'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'hr',
        'table', 'thead', 'tbody', 'th', 'td', 'tr'
    ]
    allowed_attributes = {
        'a': ['href', 'title', 'target'],
        'img': ['src', 'alt', 'title', 'width', 'height']
    }
    sanitized_html = bleach.clean(html_from_markdown, tags=allowed_tags, attributes=allowed_attributes)
    
    return render_template("blog_post.html", article=sanitized_html)


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)