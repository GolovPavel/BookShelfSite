from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.contrib.contenttypes.fields import GenericRelation

from book_shelf.settings import MEDIA_ROOT
import os


class Like(models.Model):
    from_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    created_at = models.DateTimeField(auto_now_add = True)
    content_type = models.ForeignKey(
        ContentType,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        unique_together = ('from_user', 'content_type', 'object_id')

        indexes = [
            models.Index(fields=['content_type', 'object_id']),
        ]

        verbose_name = "Like"
        verbose_name_plural = "Likes"


class Comment(models.Model):
    from_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    comment_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add = True)
    content_type = models.ForeignKey(
        ContentType,
        blank = True,
        null = True,
        on_delete = models.SET_NULL
    )
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        indexes = [
            #Together index for fast searching
            models.Index(fields=['content_type', 'object_id', 'created_at'])
        ]

        ordering = ["created_at"]

        verbose_name = "Comment"
        verbose_name_plural = "Comments"


class Book(models.Model):
    title = models.CharField(
        max_length = 255,
    )
    picture = models.ImageField(
        upload_to = "pictures/book_covers/",
        default = os.path.join(
            'pictures',
            'book_covers',
            'defaultCover.jpg'
        )
    )
    description =  models.TextField()
    created_at = models.DateTimeField(auto_now_add = True)
    is_public = models.BooleanField(default = False)
    users = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='UserToBook'
    )

    def get_absolute_url(self):
        return "/books/{}/".format(self.id)

    class Meta:
        #Indexes for and searching ordering data
        indexes = [
            #Indexes for ordering and searching
            models.Index(fields=['title']),
            #Index for ordering
            models.Index(fields=['created_at']),
            #index for where condition
            models.Index(fields=['is_public']),
        ]

        ordering = ["-created_at"]

        verbose_name = "Book"
        verbose_name_plural = "Books"


class Note(models.Model):
    title = models.CharField(max_length = 1024)
    note_text = models.TextField()
    book = models.ForeignKey(
        Book,
        on_delete = models.CASCADE
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add = True)
    likes = GenericRelation(Like)
    comments = GenericRelation(Comment)

    def get_absolute_url(self):
        return "/notes/{}/".format(self.id)

    class Meta:
        indexes = [
            #Index for ordering
            models.Index(fields=['created_at'])
        ]

        ordering = ["created_at"]

        verbose_name = "Note"
        verbose_name_plural = "Notes"


class BookRating(models.Model):
    book = models.ForeignKey(
        Book,
        on_delete = models.CASCADE
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

        verbose_name = "Book rating"
        verbose_name_plural = "Books rating"


class UserToBook(models.Model):
    book = models.ForeignKey(
        Book,
        on_delete = models.CASCADE
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE
    )
    is_public = models.BooleanField(default = True)

    class Meta:
        unique_together = ('book', 'user')

        verbose_name = "Book of user"
        verbose_name_plural = "Books of users"
