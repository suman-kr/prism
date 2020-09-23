from django.shortcuts import render
from user.models import User
from user.serializers import UserSerializer, CreateUserSerializer, LoginUserSerializer
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.contrib.auth import authenticate

class UserList(APIView):
    def get(self, request):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)


class UserDetail(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def post(self, request):
        user_serializer = CreateUserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Login(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        # token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        })




