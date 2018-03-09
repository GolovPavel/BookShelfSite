from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from book_shelf.settings import MEDIA_ROOT
import os

class User(models.Model):
    username = models.CharField(
        max_length = 64,
        unique = True
    )
    reg_date = models.DateTimeField(auto_now = True)
    password = models.CharField(max_length = 124)

class Book(models.Model):
    title = models.CharField(
        max_length = 255,
        unique = True
    )
    picture = models.ImageField(
        upload_to = "pictures/book_covers/",
        default = os.path.join(
            MEDIA_ROOT,
            'pictures',
            'book_covers',
            'defaultCover.jpg'
        )
    )
    description =  models.TextField()
    created_at = models.DateTimeField(auto_now = True)
    is_public = models.BooleanField(default = False)

class Note(models.Model):
    title = models.CharField(max_length = 1024)
    note_text =  models.TextField()
    book = models.ForeignKey(
        Book,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    user = models.ForeignKey(
        User,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    created_at = models.DateTimeField(auto_now = True)

class Like(models.Model):
    pass

class Comment(models.Model):
    pass

class Book_rating(models.Model):
    book = models.ForeignKey(
        Book,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    from_user = models.ForeignKey(
        User,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    rating = models.IntegerField(
        default = 0,
        validators = [MaxValueValidator(5), MinValueValidator(0)]
    )

    class Meta:
        unique_together = ('book', 'from_user')

class User_to_book(models.Model):
    book = models.ForeignKey(
        Book,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    user = models.ForeignKey(
        User,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    is_public = models.BooleanField(default = True)

    class Meta:
        unique_together = ('book', 'user')
