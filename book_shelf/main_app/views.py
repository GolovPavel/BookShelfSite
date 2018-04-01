from django.shortcuts import render

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return render(
            request,
        'main_app/mainpage.html',
        )

    return render(
        request,
        'main_app/welcomepage.html',
    )
