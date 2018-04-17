from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.db.models.functions import Coalesce
from django.core.paginator import Paginator

from django.db.models import Avg
from django.db.models import Count

from django.contrib.auth.models import User
from main_app.models import Book
from main_app.models import Note
from main_app.models import Like
from main_app.models import Comment
from main_app.models import BookRating
from main_app.models import UserToBook
from django.contrib.contenttypes.models import ContentType


#Caching models content types
notes_content_id = ContentType.objects.get_for_model(Note).id

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


#Api for react app
@login_required
def get_books_by_user(request):
    books = Book.objects \
        .filter(users = request.user.id) \
        .values('id', 'title', 'picture')

    paginator = Paginator(books, 6, allow_empty_first_page=False)
    num_pages = paginator.num_pages
    current_page = request.GET.get('page') or 1

    try:
        page = paginator.page(current_page)
    except EmptyPage:
        page = []
        current_page = 0

    response = {
        'num_pages': num_pages,
        'current_page': current_page,
        'books': list(page),
    }

    return JsonResponse(response)


@login_required
def get_user_information(request):
    user_inf = User.objects \
        .filter(id = request.user.id) \
        .annotate(books_count = Count('book__id')) \
        .values('username', 'email', 'books_count')

    return JsonResponse(list(user_inf), safe=False)


#View for django template
@login_required
def get_book_by_id(request, book_id):
    book = Book.objects \
        .annotate(rating = Coalesce(Avg('bookrating__rating'), 0)) \
        .get(id = book_id)

    notes = book.note_set \
        .filter(user_id=request.user.id) \
        .annotate(likes_count = Count('likes'))

    context = {
        'book': book,
        'notes': notes,
    }

    return render(
        request,
        'main_app/bookpage.html',
        context
    )


@login_required
def get_profile_page(request):
    user_info = User.objects \
        .annotate(books_count = Count('book__id', distinct=True)) \
        .annotate(notes_count = Count('note__id', distinct=True)) \
        .get(id = request.user.id)

    return render(
        request,
        'main_app/profilepage.html',
        {'user_info': user_info}
    )


#Deprecated methods
@login_required
def get_note_by_id(request, note_id):
    note = Note.objects.annotate(likes_count = Count('likes')).get(id = note_id)
    comments = note.comments.select_related('from_user')

    context = {
        'note': note,
        'comments': comments,
    }

    return render(
        request,
        'main_app/notepage.html',
        context,
    )


@login_required
def get_notes_by_user(request):
    notes = Note.objects.filter(user = request.user.id).annotate(likes_count = Count('likes'))

    return render(
        request,
        'main_app/notespage.html',
        {'notes': notes,},
    )
