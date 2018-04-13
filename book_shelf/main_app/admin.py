from django.contrib import admin

from main_app.models import Book
from main_app.models import Note
from main_app.models import Like
from main_app.models import Comment
from main_app.models import BookRating
from main_app.models import UserToBook

# Register your models here.

class BookAdmin(admin.ModelAdmin):
    pass

class NoteAdmin(admin.ModelAdmin):
    raw_id_fields = ('book', 'user',)

class LikeAdmin(admin.ModelAdmin):
    raw_id_fields = ('from_user', 'content_type',)

class CommentAdmin(admin.ModelAdmin):
    raw_id_fields = ('from_user', 'content_type',)

class BookRatingAdmin(admin.ModelAdmin):
    raw_id_fields = ('book', 'from_user',)

class UserToBookAdmin(admin.ModelAdmin):
    raw_id_fields = ('book', 'user',)

admin.site.register(Book, BookAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(Like, LikeAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(BookRating, BookRatingAdmin)
admin.site.register(UserToBook, UserToBookAdmin)
