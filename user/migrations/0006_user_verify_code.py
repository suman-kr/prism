# Generated by Django 3.1.1 on 2020-09-24 09:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0005_user_is_verified'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='verify_code',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='Verification Code'),
        ),
    ]
