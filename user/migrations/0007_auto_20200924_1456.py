# Generated by Django 3.1.1 on 2020-09-24 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_user_verify_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='verify_code',
            field=models.CharField(default=1111, max_length=50, verbose_name='Verification Code'),
        ),
    ]
