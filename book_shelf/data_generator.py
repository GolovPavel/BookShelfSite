from django.contrib.auth.models import User
from main_app.models import Book
from main_app.models import Note
from main_app.models import Like
from main_app.models import Comment
from main_app.models import BookRating
from main_app.models import UserToBook
from django.db.utils import IntegrityError
from django.contrib.contenttypes.models import ContentType

import time
import random
from mimesis import Generic

users = []
books = []
notes = []
comments = []

BATCH_SIZE = 2000

books_content_id = ContentType.objects.get_for_model(Book).id
notes_content_id = ContentType.objects.get_for_model(Note).id
comments_content_id = ContentType.objects.get_for_model(Comment).id

generator = Generic()


def delete_all_data():
    print("Removing all data from db...")
    User.objects.filter(is_superuser = False).delete()
    Book.objects.all().delete()
    Note.objects.all().delete()
    Like.objects.all().delete()
    Comment.objects.all().delete()
    BookRating.objects.all().delete()
    UserToBook.objects.all().delete()


def generate_users(count):
    buffer = []
    print("Adding {} users to db...".format(count))

    for _ in range(count):
        user = User(
            username = get_unique_username(),
            password = generator.cryptographic.hash(),
        )
        buffer.append(user)

    User.objects.bulk_create(buffer, BATCH_SIZE)

    users = User.objects.values_list('id', flat = True)
    return users



def generate_books(count):
    buffer = []
    print("Adding {} books to db...".format(count))

    for _ in range(count):
        book = Book(
            title = generator.text.title() + str(generator.numbers.between(-10000, 10000)),
            picture = "files/media/pictures/book_covers" + generator.file.file_name(),
            description = generator.text.text(),
            created_at = generator.datetime.datetime(),
            is_public = generator.development.boolean()
        )
        buffer.append(book)

    Book.objects.bulk_create(buffer, BATCH_SIZE)

    books = Book.objects.values_list('id', flat = True)
    return books

def generate_notes(count, users, books):
    buffer = []
    print("Adding {} notes to db...".format(count))

    users_len = len(users)
    books_len = len(books)

    for _ in range(count):
        note = Note(
            title = generator.text.title() + str(generator.numbers.between(-10000, 10000)),
            note_text = generator.text.text(),
            book_id = books[random.randint(0, books_len - 1)],
            user_id = users[random.randint(0, users_len - 1)],
            created_at = generator.datetime.datetime(),
        )
        buffer.append(note)

    Note.objects.bulk_create(buffer, BATCH_SIZE)

    notes = Note.objects.values_list('id', flat = True)
    return notes


def generate_comments(count, users, books, notes):
    buffer = []
    print("Adding {} comments to db...".format(count))

    users_len = len(users)
    notes_len = len(notes)
    books_len = len(books)

    for _ in range(count):
        obj_type = random.randint(1, 2)
        user_id = users[random.randint(0, users_len - 1)]

        if (obj_type == 1):
            content_type_id = books_content_id;
            object_id = books[random.randint(0, books_len - 1)]
        else:
            content_type_id = notes_content_id;
            object_id = notes[random.randint(0, notes_len - 1)]

        comment = Comment(
            from_user_id = user_id,
            comment_text = generator.text.text(),
            content_type_id = content_type_id,
            object_id = object_id,
            created_at = generator.datetime.datetime(),
        )

        buffer.append(comment)

    Comment.objects.bulk_create(buffer, BATCH_SIZE)

    comments = Comment.objects.values_list('id', flat = True)
    return comments

def generate_likes(count, users, notes, comments):
    buffer = []
    print("Adding {} likes to db...".format(count))

    users_len = len(users)
    notes_len = len(notes)
    comments_len = len(comments)

    for _ in range(count):
        obj_type = random.randint(1, 2)
        user_id = users[random.randint(0, users_len - 1)]

        if (obj_type == 1):
            content_type_id = comments_content_id;
            object_id = comments[random.randint(0, comments_len - 1)]
        else:
            content_type_id = notes_content_id;
            object_id = notes[random.randint(0, notes_len - 1)]

        like = Like(
            from_user_id = user_id,
            content_type_id = content_type_id,
            object_id = object_id,
            created_at = generator.datetime.datetime(),
        )

        buffer.append(like)


        if len(buffer) == 2000:
            try:
                Like.objects.bulk_create(buffer)
                buffer.clear()
            except:
                print("Can't add 2000 likes becouse duplicate detected")

    try:
        Like.objects.bulk_create(buffer)
    except:
        print("Can't add 2000 likes becouse duplicate detected")


def generate_bookRating(count, users, books):
    buffer = []
    print("Adding {} bookRating to db...".format(count))

    users_len = len(users)
    books_len = len(books)

    for _ in range(count):
        user_id = users[random.randint(0, users_len - 1)]
        book_id = books[random.randint(0, books_len - 1)]

        rating = BookRating(
            book_id = book_id,
            from_user_id = user_id,
            rating = generator.numbers.between(1, 5)
        )

        buffer.append(rating)

        if len(buffer) == 2000:
            try:
                BookRating.objects.bulk_create(buffer)
                buffer.clear()
            except:
                print("Can't add 2000 bookRatings becouse duplicate detected")

    try:
        BookRating.objects.bulk_create(buffer)
    except:
        print("Can't add 2000 bookRatings becouse duplicate detected")




def generate_userToBook(count, users, books):
    buffer = []
    print("Adding {} userToBook to db...".format(count))

    users_len = len(users)
    books_len = len(books)

    for _ in range(count):
        user_id = users[random.randint(0, users_len - 1)]
        book_id = books[random.randint(0, books_len - 1)]

        user_to_book = UserToBook(
            book_id = book_id,
            user_id = user_id,
            is_public = generator.development.boolean()
        )

        buffer.append(user_to_book)

        if len(buffer) == 2000:
            try:
                UserToBook.objects.bulk_create(buffer)
                buffer.clear()
            except:
                print("Can't add 2000 userToBook becouse duplicate detected")

    try:
        UserToBook.objects.bulk_create(buffer)
    except:
        print("Can't add 2000 userToBook becouse duplicate detected")


def get_unique_username():
    return generator.person.username() + str(generator.numbers.between(-10000, 10000))


def generate_data(count = 1000):
    # delete_all_data()

    start_all = time.time()

    start_time = time.time()
    users = generate_users(count)
    print("--- %s seconds ---" % (time.time() - start_time))

    start_time = time.time()
    books = generate_books(count)
    print("--- %s seconds ---" % (time.time() - start_time))

    start_time = time.time()
    notes = generate_notes(count, users, books)
    print("--- %s seconds ---" % (time.time() - start_time))

    start_time = time.time()
    comments = generate_comments(count, users, books, notes)
    print("--- %s seconds ---" % (time.time() - start_time))

    start_time = time.time()
    generate_likes(count, users, notes, comments)
    print("--- %s seconds ---" % (time.time() - start_time))

    start_time = time.time()
    generate_bookRating(count, users, books)
    print("--- %s seconds ---" % (time.time() - start_time))

    start_time = time.time()
    generate_userToBook(count, users, books)
    print("--- %s seconds ---" % (time.time() - start_time))

    print("Data generating finished. Total time %s seconds" % (time.time() - start_all))
