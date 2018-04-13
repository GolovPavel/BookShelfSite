from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.db.models.functions import Coalesce

from django.db.models import Avg
from django.db.models import Count

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


@login_required
def get_book_by_id(request, book_id):
    book = Book.objects.annotate(rating = Coalesce(Avg('bookrating__rating'), 0.0)).get(id = book_id)
    context = {
        'book': book,
    }

    return render(
        request,
        'main_app/bookpage.html',
        {'book': book,},
    )


@login_required
def get_books_by_user(request):
    books = Book.objects.annotate(rating = Coalesce(Avg('bookrating__rating'), 0.0)).filter(users = request.user.id)

    return render(
        request,
        'main_app/bookspage.html',
        {'books': books,},
    )
