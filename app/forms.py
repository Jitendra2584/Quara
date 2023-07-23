from django.forms import ModelForm
from django import forms
from django.contrib.auth.models import User
from django_select2.forms import Select2Widget
from django.contrib.auth import get_user_model
from .models import Question,Answer
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, SetPasswordForm, PasswordResetForm


# Create the form class.



class Userform(ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput(attrs={'placeholder': 'Enter your password'}),required=True,)
    password2 = forms.CharField(label='Confirm Password', widget=forms.PasswordInput(attrs={'placeholder': 'Confirm your password'}),required=True)
    email = forms.EmailField(widget=forms.TextInput(attrs={'placeholder': 'Valid Email only'}), required=True)
    class Meta: 
        model = get_user_model()
        fields = ['username']
    def save(self, commit=True):
        user = super(Userform, self).save(commit=False)
        user.email = self.cleaned_data['email']
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user


class SetPasswordForm(SetPasswordForm):
    class Meta:
        model = get_user_model()
        fields = ['new_password1', 'new_password2']

class QuestionForm(ModelForm):
    class Meta:
        model = Question
        fields=['title']

    title = forms.CharField(widget=forms.Textarea(attrs={'rows': 3, 'cols': 100}))

class AnswerForm(ModelForm):
    class Meta:
        model = Answer
        fields=['content']
    content = forms.CharField(widget=forms.Textarea(attrs={'rows': 3, 'cols': 100}))


class PasswordResetForm(PasswordResetForm):
    def __init__(self, *args, **kwargs):
        super(PasswordResetForm, self).__init__(*args, **kwargs)


