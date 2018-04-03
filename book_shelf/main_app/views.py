from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

from django.db.models import Avg
from django.db.models import Count

from main_app.models import Book
from main_app.models import Note
from main_app.models import Like
from main_app.models import Comment
from main_app.models import BookRating
from main_app.models import UserToBook



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
    note = Note.objects.get(id = note_id)
    likes = note.likes.aggregate(Count('id'))
    comments = note.comments.filter(
        from_user_id = request.user.id
    )

    context = {
        'note': note,
        'likes': likes['id__count'],
        'comments': comments,
    }

    return render(
        request,
        'main_app/notepage.html',
        context
    )


@login_required
def get_notes_by_user(request):
    notes = Note.objects.filter(user = request.user.id)
    return render(
        request,
        'main_app/notespage.html',
        {'notes': notes}
    )


@login_required
def get_book_by_id(request, book_id):
    book = Book.objects.get(id = book_id)
    rating = BookRating.objects.filter(book_id = book.id).aggregate(Avg('rating'))

    context = {
        'book': book,
        'rating': rating['rating__avg'] or 0,
    }

    return render(
        request,
        'main_app/bookpage.html',
        context,
    )


@login_required
def get_books_by_user(request):
    books = Book.objects.filter(users = request.user.id)
    return render(
        request,
        'main_app/bookspage.html',
        {'books': books}
    )
