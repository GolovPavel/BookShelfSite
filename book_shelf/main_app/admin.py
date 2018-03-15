from django.contrib import admin

from main_app.models import Book
from main_app.models import Note
from main_app.models import Like
from main_app.models import Comment
from main_app.models import Book_rating
from main_app.models import User_to_book

# Register your models here.

class BookAdmin(admin.ModelAdmin):
    pass

class NoteAdmin(admin.ModelAdmin):
    pass

class LikeAdmin(admin.ModelAdmin):
    pass

class CommentAdmin(admin.ModelAdmin):
    pass

class Book_ratingAdmin(admin.ModelAdmin):
    pass

class User_to_bookAdmin(admin.ModelAdmin):
    pass

admin.site.register(Book, BookAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(Like, LikeAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Book_rating, Book_ratingAdmin)
admin.site.register(User_to_book, User_to_bookAdmin)
