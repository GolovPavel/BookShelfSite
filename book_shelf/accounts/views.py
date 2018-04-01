from django.shortcuts import render, redirect
from .forms import RegisterForm, LoginForm
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout

def register_user(request):
    if request.user.is_authenticated:
        return redirect('/')

    if request.method == "POST":
        form = RegisterForm(request.POST)

        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            email = form.cleaned_data['email']
            User.objects.create_user(
                username = username,
                password = password,
                email = email,
            )
            messages.success(request, 'User registered successfull')
            return redirect(
                '/accounts/login'
            )
        else:
            messages.error(request, form.errors)
            return redirect('/accounts/register/')
    else:
        form = RegisterForm()

        return render(
            request,
            'accounts/register.html',
            {'form': form},
        )

def login_user(request):
    if request.user.is_authenticated:
        return redirect('/')

    if request.method == "POST":
        form = LoginForm(request.POST)

        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']

            user = authenticate(
                request,
                username = username,
                password = password,
            )
            if user is not None:
                login(
                    request,
                    user,
                )
                return redirect('/')
            else:
                messages.error(request, 'Wrong username or password')
                return redirect('/accounts/login')
        else:
            messages.error(request, form.errors)
            return redirect('/accounts/login')
    else:
        form = LoginForm()

        return render(
            request,
            'accounts/login.html',
            {'form': form},
        )

def logout_user(request):
    logout(request)
    return redirect('/')
