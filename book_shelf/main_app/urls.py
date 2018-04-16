from django.urls import include, path
from . import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('', views.index, name = 'index'),

    path('user_notes/', views.get_notes_by_user, name = 'user_notes'),

    path('books/<int:book_id>/', views.get_book_by_id, name = 'book_by_id'),

    path('api/user_books/', views.get_books_by_user, name = 'user_books'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) \
  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
