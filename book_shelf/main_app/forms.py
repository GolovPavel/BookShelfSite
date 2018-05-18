from django.forms import ModelForm
from django import forms
from .models import Book, Note

from . import constants

class BookForm(ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'description', 'picture']


class NoteForm(forms.Form):
    title = forms.CharField(required=False)
    note_text = forms.CharField()
    book_id = forms.IntegerField()


    def clean_title(self):
        data = self.cleaned_data['title']
        if data == "":
            return "Not titled"
        else:
            return data

    def clean_note_text(self):
        data = self.cleaned_data['note_text']
        if data == constants.NOTE_EMPTY_TEXT:
            raise forms.ValidationError(constants.NOTE_TEXT_EMPTY_ERROR)
        else:
            return data

class NoteLikeForm(forms.Form):
    object_id = forms.IntegerField()
