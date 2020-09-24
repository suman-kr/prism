from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'contact',
                  'h_no', 'street_one', 'street_two', 'city', 'state', 'pin', 'roles', 'is_verified']


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'contact',
                  'h_no', 'street_one', 'street_two', 'city', 'state', 'pin', 'roles', 'password', 'is_verified']
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
            is_verified=validated_data['is_verified']
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


class VerifyEmailSerializer(serializers.Serializer):
    email = serializers.CharField()
    code = serializers.CharField()

    def validate(self, data):
        user = User.objects.filter(email=data["email"])
        if user:
            verify_code = user[0].verify_code
            if str(data["code"]) == str(verify_code):
                return user[0]
            raise serializers.ValidationError({"error": "Invalid Verification Code"})
        raise serializers.ValidationError({"error": "Invalid Email"})
