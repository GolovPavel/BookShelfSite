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
    note = Note.objects.get(id = note_id)
    likes = note.likes.aggregate(Count('id'))
    comments = note.comments.filter(
        from_user_id = request.user.id,
    )

    context = {
        'note': note,
        'likes': likes['id__count'],
        'comments': comments,
        'user_username': request.user.username,
    }

    return render(
        request,
        'main_app/notepage.html',
        context
    )


@login_required
def get_notes_by_user(request):
    notes = Note.objects.filter(user = request.user.id)
    likes_count = Like.objects.filter(
        notes__id__in = notes.values_list('id', flat=True)
    ).values('object_id').annotate(likes = Count('id'))

    notes_and_likes = {note: 0 for note in notes}

    for note in notes:
        for likes in likes_count:
            if likes['object_id'] == note.id:
                notes_and_likes[note] = likes['likes']

    return render(
        request,
        'main_app/notespage.html',
        {'notes_and_likes': notes_and_likes}
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
    ratings = BookRating.objects.filter(book_id__in = books.values_list('id', flat=True)).values('book__id').annotate(rating = Avg('rating'))

    books_and_rating = {book: 0 for book in books}

    for book in books:
        for rating in ratings:
            print(rating)
            if rating['book__id'] == book.id:
                books_and_rating[book] = rating['rating']

    return render(
        request,
        'main_app/bookspage.html',
        {'books_and_rating': books_and_rating}
    )
