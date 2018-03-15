from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.conf import settings

from book_shelf.settings import MEDIA_ROOT
import os

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

    def __str__(self):
        return self.title

class Note(models.Model):
    title = models.CharField(max_length = 1024)
    note_text = models.TextField()
    book = models.ForeignKey(
        Book,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    created_at = models.DateTimeField(auto_now = True)

    def __str__(self):
        return "{} for book {}".format(self.title, self.book)

class Like(models.Model):
    from_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    created_at = models.DateTimeField(auto_now = True)
    content_type = models.ForeignKey(
        ContentType,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        unique_together = ('from_user', 'object_id')

    def __str__(self):
        return "from user {} for object {}".format(self.from_user, self.object_id)


class Comment(models.Model):
    from_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    coment_text = models.TextField()
    created_at = models.DateTimeField(auto_now = True)
    content_type = models.ForeignKey(
        ContentType,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return "from user {} for object {}".format(self.from_user, self.object_id)


class Book_rating(models.Model):
    book = models.ForeignKey(
        Book,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    from_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
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

    def __str__(self):
        return "from user {} for book {}".format(self.from_user, self.book)


class User_to_book(models.Model):
    book = models.ForeignKey(
        Book,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    is_public = models.BooleanField(default = True)

    class Meta:
        unique_together = ('book', 'user')

    def __str__(self):
        return "user: {}, book: {}".format(self.user, self.book)
