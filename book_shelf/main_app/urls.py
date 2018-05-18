from django.urls import include, path
from . import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('', views.index, name = 'index'),

    path('api/user_books/', views.get_books_by_user),
    path('api/user_info/', views.get_user_information),

    path('api/book/<int:book_id>/', views.get_book_by_id),
    path('api/book/add_book/', views.add_book),

    path('api/note/add_note', views.add_note),
    path('api/note/add_like', views.add_like_to_note),
    path('api/note/delete_like', views.delete_like_from_note),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) \
  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
