from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.contrib.auth.backends import BaseBackend
from django.db.models import Q


class AuthenticationBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        user_model = get_user_model()
        try:
            user = user_model.objects.get(
                Q(email=username) | Q(contact=username))
            if user.check_password(password):
                return user
        except user_model.DoesNotExist:
            return None
        except:
            return None

    def get_user(self, user_id):
        user_model = get_user_model()
        try:
            return user_model.objects.get(pk=user_id)
        except user_model.DoesNotExist:
            return None
