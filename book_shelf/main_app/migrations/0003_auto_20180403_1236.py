# Generated by Django 2.0.3 on 2018-04-03 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_app', '0002_auto_20180403_1221'),
    ]

    operations = [
        migrations.AlterIndexTogether(
            name='like',
            index_together=set(),
        ),
        migrations.AddIndex(
            model_name='like',
            index=models.Index(fields=['content_type', 'object_id'], name='main_app_li_content_43c2b6_idx'),
        ),
    ]
