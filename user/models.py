from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .manager import UserManager
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from django.core.mail import EmailMessage
import random
from django.conf import settings

class User(AbstractBaseUser):
    ROLES = [(
        'ADV', 'Advertiser'), ('PTR', 'Partner')]
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    contact = models.CharField(
        verbose_name="Phone Number", max_length=50, unique=True)
    h_no = models.CharField(verbose_name="House/Flat No", max_length=50)
    street_one = models.CharField(max_length=50, blank=True, null=True)
    street_two = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    pin = models.CharField(verbose_name="Pincode", max_length=50)
    roles = models.CharField(choices=ROLES, max_length=3)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    verify_code = models.CharField(
        verbose_name="Verification Code", max_length=50, default=999)
    is_verified = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.first_name + " " + self.last_name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


@receiver(post_save, sender=User)
def email_verification(sender, instance, **kwargs):
    if instance.is_verified == False:
        subject, from_email, to = 'Email Verification', settings.EMAIL_HOST_USER, instance.email
        code = random.randint(1000, 9999)
        context = {'first_name': instance.first_name,
                   'code': code}
        User.objects.filter(pk=instance.id).update(verify_code=code)
        template = get_template('email.html')
        html_content = template.render(context)
        msg = EmailMessage(subject, html_content, from_email, [to])
        msg.content_subtype = "html"
        msg.send()