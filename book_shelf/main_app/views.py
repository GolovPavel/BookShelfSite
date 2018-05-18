from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.db.models.functions import Coalesce
from django.core.paginator import Paginator,  EmptyPage
from django.core import serializers
from django.core.files.storage import default_storage

from django.db.models import Avg
from django.db.models import Count
from django.db.models import Q


from django.contrib.auth.models import User
from main_app.models import Book
from main_app.models import Note
from main_app.models import Like
from main_app.models import Comment
from main_app.models import BookRating
from main_app.models import UserToBook
from django.contrib.contenttypes.models import ContentType
import json
from . import constants
from .forms import BookForm, NoteForm, NoteLikeForm

#Caching models content types
NOTES_CONTENT_TYPE_ID = ContentType.objects.get_for_model(Note).id


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
    user_info = User.objects \
        .filter(id = request.user.id) \
        .annotate(books_count = Count('book__id', distinct=True)) \
        .annotate(notes_count = Count('note__id', distinct=True)) \
        .values('username', 'email', 'books_count', 'notes_count')

    response = {
        'user': list(user_info),
    }

    return JsonResponse(response)

@login_required
def get_book_by_id(request, book_id):
    book = Book.objects \
            .annotate(rating = Coalesce(Avg('bookrating__rating'), 0))

    notes = book.get(id=book_id) \
        .note_set \
        .filter(user_id=request.user.id) \
        .annotate(likes_count = Count('likes')) \
        .annotate(liked = Count('likes', filter=Q(user_id=request.user.id))) \
        .values('id', 'title', 'note_text', 'likes_count', 'liked')


    response = {
        'book': list(
            book.filter(id=book_id) \
                .values('title', 'description', 'picture', 'rating')
        ),
        'notes': list(notes),
    }

    return JsonResponse(response)


@login_required
@require_http_methods(["POST"])
def add_note(request):
    form = NoteForm(request.POST);
    if form.is_valid():
        title = form.cleaned_data['title']
        note_text = form.cleaned_data['note_text']
        book_id = form.cleaned_data['book_id']

        Note.objects.create(
            title = title,
            note_text = note_text,
            book_id = book_id,
            user_id = request.user.id
        )

        return HttpResponse('')
    else:
        return HttpResponse(form.errors.as_json(), status=400)



@login_required
@require_http_methods(["POST"])
def add_book(request):
    form = BookForm(request.POST, request.FILES)
    if form.is_valid():
        book = form.save()
        UserToBook.objects.create(book_id = book.id, user_id = request.user.id)
        return HttpResponse('')
    else:
        return HttpResponse(form.errors.as_json(), status=400)


@login_required
@require_http_methods(["POST"])
def add_like_to_note(request):
    form = NoteLikeForm(request.POST)
    if form.is_valid():
        object_id = form.cleaned_data['object_id']
        user_id = request.user.id
        like = Like.objects.filter(
            object_id = object_id,
            from_user_id = user_id,
            content_type_id = NOTES_CONTENT_TYPE_ID
        )

        if like.exists():
            return HttpResponse('This user already liked this object', status=400)
        else:
            like = Like(
                object_id = object_id,
                from_user_id = user_id,
                content_type_id = NOTES_CONTENT_TYPE_ID,
            )
            like.save()
            return HttpResponse('')
    else:
        return HttpResponse('Bad formdata recieved', status=400)


@login_required
@require_http_methods(["POST"])
def delete_like_from_note(request):
    form = NoteLikeForm(request.POST)
    if form.is_valid():
        object_id = form.cleaned_data['object_id']
        user_id = request.user.id
        like = Like.objects.filter(
            object_id = object_id,
            from_user_id = user_id,
            content_type_id = NOTES_CONTENT_TYPE_ID
        )

        if like.exists():
            like.delete()
            return HttpResponse('')
        else:
            return HttpResponse('This like from this user does not exist', status=400)
    else:
        return HttpResponse('Bad formdata recieved', status=400)
