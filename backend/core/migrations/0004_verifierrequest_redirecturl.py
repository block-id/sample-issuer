# Generated by Django 4.0.3 on 2022-05-15 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_verifierrequest_token_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='verifierrequest',
            name='redirectUrl',
            field=models.URLField(default=''),
            preserve_default=False,
        ),
    ]
