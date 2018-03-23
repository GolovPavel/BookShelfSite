from django.contrib.auth.models import User
from main_app.models import Book
from main_app.models import Note
from main_app.models import Like
from main_app.models import Comment
from main_app.models import BookRating
from main_app.models import UserToBook
from django.db.utils import IntegrityError

import time
import random
from mimesis import Generic, Person

users = []
books = []
notes = []
comments = []

#TODO add butch delete (4000 notes per time)
def delete_all_data():
    print("Removing all data from db...")
    User.objects.filter().delete()
    Book.objects.all().delete()
    Note.objects.all().delete()
    Like.objects.all().delete()
    Comment.objects.all().delete()
    Book_rating.objects.all().delete()
    User_to_book.objects.all().delete()

generator = Generic()

#bulk create second parameter
def generate_users(count = 100000):
    buffer = []
    print("Adding {} users to db...".format(count))

    add_to_db = 0

    for _ in range(count):
        user = User(
            username = get_unique_username(),
            password = generator.cryptographic.hash(),
        )
        buffer.append(user)
        add_to_db += 1

        if add_to_db >= 2000:
            User.objects.bulk_create(buffer)
            buffer.clear()
            add_to_db = 0

    global users
    #values list flat = true
    users = [
        user['id'] for user in [
            id for id in User.objects.all().values('id')
        ]
    ]

#get id's instead objects Contenttype.get_for_object
def generate_books(count = 100000):
    buffer = []
    print("Adding {} books to db...".format(count))

    add_to_db = 0

    for _ in range(count):
        book = Book(
            title = generator.text.title() + str(generator.numbers.between(-10000, 10000)),
            picture = "files/media/pictures/book_covers" + generator.file.file_name(),
            description = generator.text.text(),
            created_at = generator.datetime.datetime(),
            is_public = generator.development.boolean()
        )
        buffer.append(book)
        add_to_db += 1

        if add_to_db >= 2000:
            Book.objects.bulk_create(buffer)
            buffer.clear()
            add_to_db = 0

    global books;
    books = list(Book.objects.all())

def generate_notes(count = 100000):
    buffer = []
    print("Adding {} notes to db...".format(count))

    users_len = len(users)
    books_len = len(books)

    add_to_db = 0

    for _ in range(count):
        note = Note(
            title = generator.text.title() + str(generator.numbers.between(-10000, 10000)),
            note_text = generator.text.text(),
            book = books[random.randint(0, books_len - 1)],
            user_id = users[random.randint(0, users_len - 1)],
            created_at = generator.datetime.datetime(),
        )
        buffer.append(note)
        add_to_db += 1

        if add_to_db >= 2000:
            Note.objects.bulk_create(buffer)
            buffer.clear()
            add_to_db = 0

    global notes
    notes = list(Note.objects.all())

def generate_comments(count = 100000):
    buffer = []
    print("Adding {} comments to db...".format(count))

    users_len = len(users)
    notes_len = len(notes)
    books_len = len(books)

    add_to_db = 0

    for _ in range(count):
        obj_type = random.randint(1, 2)
        comment = Comment(
            from_user_id = users[random.randint(0, users_len - 1)],
            comment_text = generator.text.text(),
            created_at = generator.datetime.datetime(),
        )

        if (obj_type == 1):
            comment.content_object = books[random.randint(0, books_len - 1)]
        else:
            comment.content_object = notes[random.randint(0, notes_len - 1)]

        buffer.append(comment)
        add_to_db += 1

        if add_to_db >= 2000:
            Comment.objects.bulk_create(buffer)
            buffer.clear()
            add_to_db = 0

    global comments
    comments = list(Comment.objects.all())

def generate_likes(count = 100000):
    buffer = []
    print("Adding {} likes to db...".format(count))

    users_len = len(users)
    notes_len = len(notes)
    comments_len = len(comments)

    add_to_db = 0

    for _ in range(count):
        obj_type = random.randint(1, 2)
        like = Like(
            from_user_id = users[random.randint(0, users_len - 1)],
            created_at = generator.datetime.datetime(),
        )

        if (obj_type == 1):
            like.content_object = comments[random.randint(0, comments_len - 1)]
        else:
            like.content_object = notes[random.randint(0, notes_len - 1)]

        buffer.append(like)
        add_to_db += 1

        if add_to_db >= 2000:
            try:
                Like.objects.bulk_create(buffer)
            except IntegrityError:
                print("Duplicates generated, 2000 likes not generated")
            buffer.clear()
            add_to_db = 0

def generate_book_rating(count = 100000):
    buffer = []
    print("Adding {} book_rating to db...".format(count))

    users_len = len(users)
    books_len = len(books)

    add_to_db = 0

    for _ in range(count):
        rating = Book_rating(
            book = books[random.randint(0, books_len - 1)],
            from_user_id = users[random.randint(0, users_len - 1)],
            rating = generator.numbers.between(1, 5)
        )

        buffer.append(rating)
        add_to_db += 1

        if add_to_db >= 2000:
            try:
                Book_rating.objects.bulk_create(buffer)
            except IntegrityError:
                print("Duplicates generated, 2000 book_rating not generated")

            buffer.clear()
            add_to_db = 0

def generate_user_to_book(count = 100000):
    buffer = []
    print("Adding {} user_to_book to db...".format(count))

    users_len = len(users)
    books_len = len(books)

    add_to_db = 0

    for _ in range(count):
        user_to_book = User_to_book(
            book = books[random.randint(0, books_len - 1)],
            user_id = users[random.randint(0, users_len - 1)],
            is_public = generator.development.boolean()
        )

        buffer.append(user_to_book)
        add_to_db += 1

        if add_to_db >= 2000:
            try:
                User_to_book.objects.bulk_create(buffer)
            except IntegrityError:
                print("Duplicates generated, 2000 user_to_book not generated")

            buffer.clear()
            add_to_db = 0



def get_unique_username():
    return generator.person.username() + str(generator.numbers.between(-10000, 10000))


def generate_data(count = 100000):
    delete_all_data()

    start_time = time.time()
    generate_users(count)
    generate_books(count)
    generate_notes(count)
    generate_comments(count)
    generate_likes(count)
    generate_book_rating(count)
    generate_user_to_book(count)
    print("--- %s seconds ---" % (time.time() - start_time))
