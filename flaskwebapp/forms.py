from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField , SubmitField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from flaskwebapp.models import User

class RegistrationForm(FlaskForm):
	username = StringField('Username', validators = [DataRequired(), Length(min=2,max=20)])
	email = StringField('Email' , validators = [DataRequired(), Email()])
	password = PasswordField('Password', validators=[DataRequired()])
	confirm_password = PasswordField('Confirm Password', validators=[DataRequired() , EqualTo('password')])
	submit = SubmitField('Sign Up')

	def validate_username(self,username):
		user = User.query.filter_by(username = username.data).first()
		if user:
			raise ValidationError('Username already taken')

	def validate_email(self,email):
		user = User.query.filter_by(email = email.data).first()
		if user:
			raise ValidationError('Email already taken')

class LoginForm(FlaskForm):
	username = StringField('Username', validators = [DataRequired(), Length(min=2,max=20)])
	password = PasswordField('Password', validators=[DataRequired()])
	remember = BooleanField('Remember Me')
	submit = SubmitField('Login')

class new_member(FlaskForm):
	name  = StringField('Name', validators = [DataRequired()])
	org = StringField('Organisation', validators = [DataRequired()])
	position = StringField('Position', validators = [DataRequired()])
	submit = SubmitField('ADD MEMBER')