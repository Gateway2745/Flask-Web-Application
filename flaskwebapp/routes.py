from flask import render_template, url_for ,flash,redirect, request , jsonify
from flaskwebapp import app , db , bcrypt
from flaskwebapp.forms import RegistrationForm,LoginForm, new_member
from flaskwebapp.models import User, Post
from flask_login import login_user,logout_user, current_user,login_required
import json
import sys

@app.route("/" , methods = ['POST' , 'GET'])
def register():
	form = RegistrationForm()
	if form.validate_on_submit():
		hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
		user = User(username = form.username.data , email=form.email.data , password = hashed_password)
		db.session.add(user)
		db.session.commit()
		return redirect(url_for('login'))
	return render_template('register.html',title = 'register' , form=form)

@app.route("/login" , methods = ['POST' , 'GET'])
def login():
	form = LoginForm()
	if form.validate_on_submit():
		user  = User.query.filter_by(username=form.username.data).first()
		if (user and bcrypt.check_password_hash(user.password , form.password.data)):
			login_user(user , remember=form.remember.data)
			next_page = request.args.get('next')
			return redirect(next_page) if next_page else redirect(url_for('members'))
		flash('Invalid Credentials!')
	return render_template('login.html' , title = 'Login' , form =form)

@app.route("/logout")
def logout():
	logout_user()
	return redirect(url_for('login'))


@app.route('/add_member' , methods=['POST'])
@app.route("/members", methods = ['POST'  , 'GET'])
@login_required
def members():
	rule = request.url_rule
	form = new_member()
	name = request.form.get('name')
	organisation = request.form.get('org')
	position = request.form.get('pos')
	if(name != None and organisation != None and position != None):
		# flash('Member Added Successfully')
		post = Post(name = name, organisation=organisation , position = position , image_file = url_for('static' , filename= 'member.png') , author = current_user)
		db.session.add(post)
		db.session.commit()
		post_id = post.id
		print('Hello world!', file=sys.stderr)
	profile_img = url_for('static', filename = 'member.png')
	cross_img = url_for('static', filename = 'cross_image.png')
	posts = Post.query.filter_by(user_id = current_user.id)
	if 'members' in rule.rule:
		return render_template('members.html' , profile_img = profile_img , cross_img = cross_img , form=form , posts =posts)
	else:
		return jsonify({"post_id" : post_id} ,20)

@app.route("/account")
@login_required
def account():
	return render_template('account.html' , title = 'Account')


@app.route("/post/<int:post_id>/delete" , methods = ['GET' , 'POST'])
@login_required
def delete_post(post_id):
	# flash('Member Deleted Successfully')
	post = Post.query.get_or_404(post_id)
	db.session.delete(post)
	db.session.commit()
	return jsonify('' ,204)
	# return redirect(url_for('members'))