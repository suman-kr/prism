from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'contact',
                  'h_no', 'street_one', 'street_two', 'city', 'state', 'pin', 'roles']


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'contact',
                  'h_no', 'street_one', 'street_two', 'city', 'state', 'pin', 'roles', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            contact=validated_data['contact'],
            h_no=validated_data['h_no'],
            street_one=validated_data['street_one'],
            street_two=validated_data['street_two'],
            city=validated_data['city'],
            state=validated_data['state'],
            pin=validated_data['pin'],
            roles=validated_data['roles'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data["username"]
        password = data["password"]
        user = authenticate(username=username, password=password)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Credentials")
