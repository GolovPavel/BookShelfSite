from django.urls import include, path
from . import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('', views.index, name = 'index'),


    path('api/user_books/', views.get_books_by_user, name = 'user_books'),
    path('api/book/<int:book_id>/', views.get_book_by_id, name = 'book'),
    path('api/user_info/', views.get_user_information, name = 'user_info'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) \
  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
