from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.index, name = 'index'),
    path('user_books/', views.get_books_by_user, name = 'user_books'),
    path('user_notes/', views.get_notes_by_user, name = 'user_notes'),
    path('books/<int:book_id>/', views.get_book_by_id, name = 'book_by_id'),
    path('notes/<int:note_id>/', views.get_note_by_id, name = 'note_by_id'),

]
